import omit from 'lodash.omit';
import Facilities from './facilities';

describe('Facilities', function() {
  let baseRequest;
  let baseSdk;

  beforeEach(function() {
    this.sandbox = sandbox.create();

    baseRequest = {
      get: this.sandbox.stub(),
      post: this.sandbox.stub()
    };
    baseSdk = {
      config: {
        audiences: {
          facilities: fixture.build('audience')
        }
      }
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let facilities;

    beforeEach(function() {
      facilities = new Facilities(baseSdk, baseRequest);
    });

    it('sets a base url for the class instance', function() {
      expect(facilities._baseUrl).to.equal(`${baseSdk.config.audiences.facilities.host}/v1`);
    });

    it('appends the supplied request module to the class instance', function() {
      expect(facilities._request).to.equal(baseRequest);
    });

    it('appends the supplied sdk to the class instance', function() {
      expect(facilities._sdk).to.equal(baseSdk);
    });
  });

  describe('create', function() {
    context('when all required information is supplied', function() {
      context('when the facility is successfully created', function() {
        let expectedHost;
        let formatFacility;
        let formattedFacility;
        let promise;
        let rawFacility;
        let request;

        beforeEach(function() {
          expectedHost = faker.internet.url();
          rawFacility = fixture.build('facility', null, { fromServer: true });
          formattedFacility = fixture.build('facility');

          formatFacility = this.sandbox.stub(Facilities.prototype, '_formatFacility')
            .returns(formattedFacility);
          request = {
            ...baseRequest,
            post: this.sandbox.stub().resolves(rawFacility)
          };

          const facilities = new Facilities(baseSdk, request);
          facilities._baseUrl = expectedHost;

          promise = facilities.create({
            address1: rawFacility.address1,
            address2: rawFacility.address2,
            city: rawFacility.city,
            geometryId: rawFacility.geometry_id,
            name: rawFacility.name,
            organizationId: rawFacility.organization_id,
            state: rawFacility.state,
            timezone: rawFacility.timezone,
            weatherLocationId: rawFacility.weather_location_id,
            zip: rawFacility.zip
          });
        });

        it('creates a new facility', function() {
          expect(request.post).to.be.deep.calledWith(
            `${expectedHost}/facilities`,
            omit(rawFacility, ['created_at', 'id', 'Info', 'Organization', 'tags'])
          );
        });

        it('formats the facility object', function() {
          return promise.then(() => {
            expect(formatFacility).to.be.calledWith(rawFacility);
          });
        });

        it('returns a fulfilled promise with the new facility information', function() {
          return expect(promise).to.be.fulfilled
            .and.to.eventually.equal(formattedFacility);
        });
      });
    });

    context('when there is missing required information', function() {
      ['organizationId', 'name', 'timezone'].forEach(function(field) {
        it(`it throws an error when ${field} is missing`, function() {
          const fn = () => {
            const facility = fixture.build('facility');
            const initialFacility = {
              ...facility,
              organizationId: facility.organizationId
            };
            const facilities = new Facilities(baseSdk, baseRequest);
            facilities.create(omit(initialFacility, [field]));
          };

          expect(fn).to.throw(`A ${field} is required to create a new facility.`);
        });
      });
    });
  });

  describe('get', function() {
    let expectedFacilityId;
    let expectedHost;
    let formatFacility;
    let formattedFacility;
    let promise;
    let rawFacility;
    let request;

    beforeEach(function() {
      expectedFacilityId = faker.random.number();
      expectedHost = faker.internet.url();
      rawFacility = fixture.build('facility', { id: expectedFacilityId }, { fromServer: true });
      formattedFacility = fixture.build('facility', { id: expectedFacilityId });

      formatFacility = this.sandbox.stub(Facilities.prototype, '_formatFacility')
        .returns(formattedFacility);
      request = {
        ...baseRequest,
        get: this.sandbox.stub().resolves(rawFacility)
      };

      const facilities = new Facilities(baseSdk, request);
      facilities._baseUrl = expectedHost;

      promise = facilities.get(expectedFacilityId);
    });

    it('gets a list of facilities from the server', function() {
      expect(request.get).to.be.calledWith(`${expectedHost}/facilities/${expectedFacilityId}`);
    });

    it('formats the facility object', function() {
      return promise.then(() => {
        expect(formatFacility).to.be.calledWith(rawFacility);
      });
    });

    it('returns the requested facility', function() {
      return expect(promise).to.be.fulfilled
        .and.to.eventually.equal(formattedFacility);
    });
  });

  describe('getAll', function() {
    let expectedHost;
    let formatFacility;
    let formattedFacilities;
    let promise;
    let rawFacilities;
    let request;

    beforeEach(function() {
      expectedHost = faker.internet.url();
      const numberOfFacilities = faker.random.number({ min: 1, max: 10 });
      formattedFacilities = fixture.buildList('facility', numberOfFacilities);
      rawFacilities = fixture.buildList('facility', numberOfFacilities, null, { fromServer: true });

      formatFacility = this.sandbox.stub(Facilities.prototype, '_formatFacility')
        .callsFake((facility) => {
          const index = rawFacilities.indexOf(facility);
          return formattedFacilities[index];
        });
      request = {
        ...baseRequest,
        get: this.sandbox.stub().resolves(rawFacilities)
      };

      const facilities = new Facilities(baseSdk, request);
      facilities._baseUrl = expectedHost;

      promise = facilities.getAll();
    });

    it('gets a list of facilities from the server', function() {
      expect(request.get).to.be.calledWith(`${expectedHost}/facilities`);
    });

    it('formats the facility object', function() {
      return promise.then(() => {
        rawFacilities.forEach((facility) => {
          expect(formatFacility).to.be.calledWith(facility);
        });
      });
    });

    it('returns a list of facilities', function() {
      return expect(promise).to.be.fulfilled
        .and.to.eventually.deep.equal(formattedFacilities);
    });
  });

  describe('getAllByOrganizationId', function() {
    let expectedHost;
    let expectedOrganizationId;
    let formatFacility;
    let formattedFacilities;
    let promise;
    let rawFacilities;
    let request;

    beforeEach(function() {
      expectedHost = faker.internet.url();
      expectedOrganizationId = faker.random.number();
      const numberOfFacilities = faker.random.number({ min: 1, max: 10 });
      formattedFacilities = fixture.buildList('facility', numberOfFacilities);
      rawFacilities = fixture.buildList('facility', numberOfFacilities, null, { fromServer: true });

      formatFacility = this.sandbox.stub(Facilities.prototype, '_formatFacility')
        .callsFake((facility) => {
          const index = rawFacilities.indexOf(facility);
          return formattedFacilities[index];
        });
      request = {
        ...baseRequest,
        get: this.sandbox.stub().resolves(rawFacilities)
      };

      const facilities = new Facilities(baseSdk, request);
      facilities._baseUrl = expectedHost;

      promise = facilities.getAllByOrganizationId(expectedOrganizationId);
    });

    it('gets a list of facilities for an organization from the server', function() {
      expect(request.get).to.be.calledWith(
        `${expectedHost}/organizations/${expectedOrganizationId}/facilities`
      );
    });

    it('formats the facility object', function() {
      return promise.then(() => {
        rawFacilities.forEach((facility) => {
          expect(formatFacility).to.be.calledWith(facility);
        });
      });
    });

    it('returns a list of facilities', function() {
      return expect(promise).to.be.fulfilled
        .and.to.eventually.deep.equal(formattedFacilities);
    });
  });

  describe('_formatFacility', function() {
    let expectedFacility;
    let facility;
    let formatOrganization;
    let formatTags;
    let formattedFacility;

    beforeEach(function() {
      facility = fixture.build('facility', null, { fromServer: true });
      expectedFacility = omit(
        {
          ...facility,
          createdAt: facility.created_at,
          geometryId: facility.geometry_id,
          info: facility.Info,
          organization: facility.Organization,
          organizationId: facility.organization_id,
          weatherLocationId: facility.weather_location_id
        },
        [
          'created_at',
          'geometry_id',
          'Info',
          'Organization',
          'organization_id',
          'weather_location_id'
        ]
      );

      formatOrganization = this.sandbox.stub(Facilities.prototype, '_formatOrganization')
        .callsFake((organization) => organization);
      formatTags = this.sandbox.stub(Facilities.prototype, '_formatTags').callsFake((tags) => tags);

      formattedFacility = Facilities.prototype._formatFacility(facility);
    });

    it('formats the necessary children objects', function() {
      expect(formatOrganization).to.be.calledWith(facility.Organization);
      expect(formatTags).to.be.calledWith(facility.tags);
    });

    it('converts the object keys to the camelCase', function() {
      expect(formattedFacility).to.deep.equal(expectedFacility);
    });
  });

  describe('_formatOrganization', function() {
    let expectedOrganization;
    let formattedOrganization;
    let organization;

    beforeEach(function() {
      organization = fixture.build(
        'organization',
        null,
        { fromServer: true }
      );
      expectedOrganization = omit(
        {
          ...organization,
          createdAt: organization.created_at,
          updatedAt: organization.updated_at
        },
        ['created_at', 'updated_at']
      );

      formattedOrganization = Facilities.prototype._formatOrganization(organization);
    });

    it('converts the object keys to camelCase', function() {
      expect(formattedOrganization).to.deep.equal(expectedOrganization);
    });
  });

  describe('_formatTags', function() {
    let expectedTags;
    let formattedTags;
    let tags;

    beforeEach(function() {
      tags = fixture.buildList(
        'facilityTag',
        faker.random.number({ min: 1, max: 2 }),
        null,
        { fromServer: true }
      );
      expectedTags = tags.map((tag) => {
        return omit(
          {
            ...tag,
            createdAt: tag.created_at,
            facilityId: tag.facility_id,
            updatedAt: tag.updated_at
          },
          ['created_at', 'facility_id', 'updated_at']
        );
      });

      formattedTags = Facilities.prototype._formatTags(tags);
    });

    it('converts the object keys to camelCase', function() {
      expect(formattedTags).to.deep.equal(expectedTags);
    });
  });
});
