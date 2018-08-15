import EdgeNodes from './edgeNodes';

import * as coordinatorUtils from '../utils/coordinator';

describe('edgeNodes', function() {
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
          edgeNodes: fixture.build('audience')
        }
      }
    };
    expectedHost = faker.internet.url();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let edgeNodes;

    beforeEach(function() {
      edgeNodes = new EdgeNodes(baseSdk, baseRequest, expectedHost);
    });

    it('sets a base url for the class instance', function() {
      expect(edgeNodes._baseUrl).to.equal(expectedHost);
    });

    it('appends the supplied request module to the class instance', function() {
      expect(edgeNodes._request).to.deep.equal(baseRequest);
    });

    it('appends the supplied sdk to the class instance', function() {
      expect(edgeNodes._sdk).to.deep.equal(baseSdk);
    });
  });

  describe('get', function() {
    context('all required params are provided', function() {
      let edgeNodeFromServerAfterFormat;
      let edgeNodeFromServerBeforeFormat;
      let expectedEdgeNodeId;
      let expectedOrganizationId;
      let formatEdgeNodeFromServer;
      let promise;
      let request;

      beforeEach(function() {
        edgeNodeFromServerAfterFormat = fixture.build('edgeNode');
        expectedEdgeNodeId = edgeNodeFromServerAfterFormat.id;
        expectedOrganizationId = edgeNodeFromServerAfterFormat.organizationId;
        edgeNodeFromServerBeforeFormat = fixture.build(
          'edgeNode',
          edgeNodeFromServerAfterFormat,
          { fromServer: true }
        );

        formatEdgeNodeFromServer = this.sandbox
          .stub(coordinatorUtils, 'formatEdgeNodeFromServer')
          .returns(edgeNodeFromServerAfterFormat);

        request = {
          ...baseRequest,
          get: this.sandbox.stub().resolves(edgeNodeFromServerBeforeFormat)
        };

        const edgeNodes = new EdgeNodes(baseSdk, request);
        edgeNodes._baseUrl = expectedHost;
        promise = edgeNodes.get(expectedOrganizationId, expectedEdgeNodeId);
      });

      it('gets the edge node from the server', function() {
        expect(request.get).to.be.calledWith(
          `${expectedHost}/organizations/${expectedOrganizationId}/edgenodes/${expectedEdgeNodeId}`
        );
      });

      it('formats the edge node object', function() {
        return promise.then(() => {
          expect(formatEdgeNodeFromServer).to.be.calledWith(
            edgeNodeFromServerBeforeFormat
          );
        });
      });

      it('returns the requested edge node', function() {
        return expect(promise).to.be.fulfilled.and.to.eventually.deep.equal(
          edgeNodeFromServerAfterFormat
        );
      });
    });

    context('the organization ID is not provided', function() {
      it('throws an error', function() {
        const edgeNodes = new EdgeNodes(baseSdk, baseRequest);
        const promise = edgeNodes.get();

        return expect(promise).to.be.rejectedWith(
          'An organizationId is required for getting an edge node.'
        );
      });
    });

    context('the edge node ID is not provided', function() {
      it('throws an error', function() {
        const edgeNodes = new EdgeNodes(baseSdk, baseRequest);
        const promise = edgeNodes.get('1');

        return expect(promise).to.be.rejectedWith(
          'An edgeNodeId is required for getting an edge node.'
        );
      });
    });
  });
});