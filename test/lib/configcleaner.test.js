
var cleaner = require('lib/configcleaner');

describe('When cleaning config hosts', function () {
  it ('should properly overwrite hosts with env hosts', function () {
   var myConfig = {
      hosts: [
        'abc123'
      ],
      local: {
        hosts: [
          'cba321'
        ]
      }
    };

    myConfig = cleaner(myConfig, 'local');

    myConfig.hosts.length.should.equal(1);
    myConfig.hosts[0].should.equal('cba321');
  });

  it ('should work properly with an environment with no hosts', function () {
    var myConfig = {
      hosts: [
        'abc123'
      ],
      local: {

      }
    };

    myConfig = cleaner(myConfig, 'local');

    myConfig.hosts.length.should.equal(1);
    myConfig.hosts[0].should.equal('abc123');
  });
});