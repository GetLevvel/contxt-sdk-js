import omit from 'lodash.omit';
import Channels from './channels';
import * as busUtils from '../utils/bus';

describe('Channels', function() {
  let baseRequest;
  let baseSdk;
  let expectedHost;

  beforeEach(function() {
    this.sandbox = sandbox.create();

    baseRequest = {
      delete: this.sandbox.stub().resolves(),
      get: this.sandbox.stub().resolves(),
      post: this.sandbox.stub().resolves(),
      put: this.sandbox.stub().resolves()
    };
    baseSdk = {
      config: {
        audiences: {
          bus: fixture.build('audience')
        }
      }
    };
    expectedHost = faker.internet.url();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let channels;

    beforeEach(function() {
      channels = new Channels(baseSdk, baseRequest, expectedHost);
    });

    it('sets a base url for the class instance', function() {
      expect(channels._baseUrl).to.equal(expectedHost);
    });

    it('appends the supplied request module to the class instance', function() {
      expect(channels._request).to.deep.equal(baseRequest);
    });

    it('appends the supplied sdk to the class instance', function() {
      expect(channels._sdk).to.deep.equal(baseSdk);
    });
  });

  describe('create', function() {
    context('when all required information is supplied', function() {
      let channelFromServerAfterFormat;
      let channelFromServerBeforeFormat;
      let channelToServerAfterFormat;
      let channelToServerBeforeFormat;
      let formatChannelFromServer;
      let formatChannelToServer;
      let promise;
      let request;

      beforeEach(function() {
        channelFromServerAfterFormat = fixture.build('channel');
        channelFromServerBeforeFormat = fixture.build(
          'channel',
          channelFromServerAfterFormat,
          { fromServer: true }
        );
        channelToServerBeforeFormat = fixture.build('channel');
        channelToServerAfterFormat = fixture.build(
          'channel',
          channelToServerBeforeFormat,
          { fromServer: true }
        );

        formatChannelFromServer = this.sandbox
          .stub(busUtils, 'formatChannelFromServer')
          .returns(channelFromServerAfterFormat);
        formatChannelToServer = this.sandbox
          .stub(busUtils, 'formatChannelToServer')
          .returns(channelToServerAfterFormat);

        request = {
          ...baseRequest,
          post: this.sandbox.stub().resolves(channelFromServerBeforeFormat)
        };

        const channels = new Channels(baseSdk, request);
        channels._baseUrl = expectedHost;
        promise = channels.create(channelToServerBeforeFormat);
      });

      it('formats the submitted event object to send to the server', function() {
        expect(formatChannelToServer).to.be.deep.calledWith(
          channelToServerBeforeFormat
        );
      });

      it('creates a new channel', function() {
        expect(request.post).to.be.deep.calledWith(
          `${expectedHost}/organizations/${
            channelToServerBeforeFormat.organizationId
          }/services/${channelToServerBeforeFormat.serviceId}/channels`,
          channelToServerAfterFormat
        );
      });

      it('formats the returned object', function() {
        return promise.then(() => {
          expect(formatChannelFromServer).to.be.deep.calledWith(
            channelFromServerBeforeFormat
          );
        });
      });

      it('returns a fulfilled promise with the new event information', function() {
        return expect(promise).to.be.fulfilled.and.to.eventually.deep.equal(
          channelFromServerAfterFormat
        );
      });
    });

    context('when there is missing required information', function() {
      const requiredFields = ['name', 'organizationId', 'serviceId'];

      requiredFields.forEach((field) => {
        it(`it throws an error when ${field} is missing`, function() {
          const channel = fixture.build('channel');

          const channels = new Channels(baseSdk, baseRequest);
          const promise = channels.create(omit(channel, [field]));

          return expect(promise).to.be.rejectedWith(
            `A ${field} is required to create a new message bus channel.`
          );
        });
      });
    });
  });

  describe('delete', function() {
    context('all required fields are provided', function() {
      let channel;
      let promise;

      beforeEach(function() {
        channel = fixture.build('channel');

        const channels = new Channels(baseSdk, baseRequest);
        channels._baseUrl = expectedHost;
        promise = channels.delete(
          channel.organizationId,
          channel.serviceId,
          channel.id
        );
      });

      it('requests to delete the event', function() {
        expect(baseRequest.delete).to.be.calledWith(
          `${expectedHost}/organizations/${channel.organizationId}/services/${
            channel.serviceId
          }/channels/${channel.id}`
        );
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled;
      });
    });

    context('the organizationId is not provided', function() {
      it('throws an error', function() {
        const channels = new Channels(baseSdk, baseRequest);
        const promise = channels.delete();

        return expect(promise).to.be.rejectedWith(
          'An organizationId is required to delete a message bus channel.'
        );
      });
    });

    context('the serviceId is not provided', function() {
      it('throws an error', function() {
        const channels = new Channels(baseSdk, baseRequest);
        const promise = channels.delete('1');

        return expect(promise).to.be.rejectedWith(
          'A serviceId is required to delete a message bus channel.'
        );
      });
    });

    context('the channelId is not provided', function() {
      it('throws an error', function() {
        const channels = new Channels(baseSdk, baseRequest);
        const promise = channels.delete('1', '2');

        return expect(promise).to.be.rejectedWith(
          'A channelId is required to delete a message bus channel.'
        );
      });
    });
  });

  describe('get', function() {
    context('the required fields are provided', function() {
      let channelFromServerAfterFormat;
      let channelFromServerBeforeFormat;
      let expectedOrganizationId;
      let expectedServiceId;
      let expectedChannelId;
      let formatChannelFromServer;
      let promise;
      let request;

      beforeEach(function() {
        channelFromServerAfterFormat = fixture.build('channel');
        expectedChannelId = channelFromServerAfterFormat.id;
        expectedOrganizationId = channelFromServerAfterFormat.organizationId;
        expectedServiceId = channelFromServerAfterFormat.serviceId;
        channelFromServerBeforeFormat = fixture.build(
          'channel',
          channelFromServerAfterFormat,
          { fromServer: true }
        );

        formatChannelFromServer = this.sandbox
          .stub(busUtils, 'formatChannelFromServer')
          .returns(channelFromServerAfterFormat);

        request = {
          ...baseRequest,
          get: this.sandbox.stub().resolves(channelFromServerBeforeFormat)
        };

        const channels = new Channels(baseSdk, request);
        channels._baseUrl = expectedHost;

        promise = channels.get(
          expectedOrganizationId,
          expectedServiceId,
          expectedChannelId
        );
      });

      it('gets the channel from the server', function() {
        expect(request.get).to.be.calledWith(
          `${expectedHost}/organizations/${expectedOrganizationId}/services/${expectedServiceId}/channels/${expectedChannelId}`
        );
      });

      it('formats the channel object', function() {
        return promise.then(() => {
          expect(formatChannelFromServer).to.be.calledWith(
            channelFromServerBeforeFormat
          );
        });
      });

      it('returns the requested event', function() {
        return expect(promise).to.be.fulfilled.and.to.eventually.deep.equal(
          channelFromServerAfterFormat
        );
      });
    });

    context('the organizationId is not provided', function() {
      it('throws an error', function() {
        const channels = new Channels(baseSdk, baseRequest);
        const promise = channels.get();

        return expect(promise).to.be.rejectedWith(
          'An organizationId is required to get a message bus channel.'
        );
      });
    });

    context('the serviceId is not provided', function() {
      it('throws an error', function() {
        const channels = new Channels(baseSdk, baseRequest);
        const promise = channels.get('1');

        return expect(promise).to.be.rejectedWith(
          'A serviceId is required to get a message bus channel.'
        );
      });
    });

    context('the channelId is not provided', function() {
      it('throws an error', function() {
        const channels = new Channels(baseSdk, baseRequest);
        const promise = channels.get('1', '2');

        return expect(promise).to.be.rejectedWith(
          'A channelId is required to get a message bus channel.'
        );
      });
    });
  });

  describe('update', function() {
    context('when all required information is available', function() {
      let channelToServerAfterFormat;
      let channelToServerBeforeFormat;
      let formatChannelToServer;
      let request;
      let promise;

      beforeEach(function() {
        channelToServerBeforeFormat = fixture.build('channel');
        channelToServerAfterFormat = fixture.build(
          'channel',
          channelToServerBeforeFormat,
          { fromServer: true }
        );
        formatChannelToServer = this.sandbox
          .stub(busUtils, 'formatChannelToServer')
          .returns(channelToServerAfterFormat);

        request = {
          ...baseRequest,
          put: this.sandbox.stub().resolves()
        };

        const channels = new Channels(baseSdk, request);
        channels._baseUrl = expectedHost;

        promise = channels.update(
          channelToServerBeforeFormat.organizationId,
          channelToServerBeforeFormat.serviceId,
          channelToServerBeforeFormat.id,
          { name: channelToServerBeforeFormat.name }
        );
      });

      it('formats the data into the right format', function() {
        expect(formatChannelToServer).to.be.deep.calledWith({
          name: channelToServerBeforeFormat.name
        });
      });

      it('updates the channel', function() {
        const { organizationId, serviceId, id } = channelToServerBeforeFormat;
        expect(request.put).to.be.deep.calledWith(
          `${expectedHost}/organizations/${organizationId}/services/${serviceId}/channels/${id}`,
          channelToServerAfterFormat
        );
      });

      it('returns a fulfilled promise', function() {
        return expect(promise).to.be.fulfilled;
      });
    });
  });
});