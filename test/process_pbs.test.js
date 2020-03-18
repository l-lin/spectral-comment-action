const { initProcessedPbs, processPbs } = require('../src/process_pbs');

test('no errors (i.e. empty array)', () => {
  const pbs = [];
  let md = processPbs('', {}, pbs);
  expect(md).not.toBeNull();
});

test('1 error', () => {
  const pbs = [
    {
      "code": "invalid-ref",
      "path": [
        "foobar",
        "get",
        "responses",
        "200",
        "content",
        "application/json",
        "schema",
        "$ref"
      ],
      "message": "ENOENT: no such file or directory, open '/home/llin/spectral-comment-action/sample/spec/schemas/foobar.yml'",
      "severity": 0,
      "range": {
        "start": {
          "line": 0,
          "character": 0
        },
        "end": {
          "line": 0,
          "character": 0
        }
      }
    }
  ];
  let processedPbs = processPbs('/home/llin/spectral-comment-action/sample/spec/openapi.yml', initProcessedPbs(), pbs);
  expect(processedPbs).not.toBeNull();
  expect(processedPbs.severitiesCount['0']).toBe(1);
  expect(processedPbs.severitiesCount['1']).toBe(0);
  expect(processedPbs.severitiesCount['2']).toBe(0);
  expect(processedPbs.severitiesCount['3']).toBe(0);
  expect(processedPbs.filteredPbs['/home/llin/spectral-comment-action/sample/spec/openapi.yml']).not.toBeNull();
  expect(processedPbs.filteredPbs['/home/llin/spectral-comment-action/sample/spec/openapi.yml'].length).toBe(1);
});

test('multiple errors', () => {
  const pbsOpenApi = [
    {
      "code": "invalid-ref",
      "path": [
        "foobar",
        "get",
        "responses",
        "200",
        "content",
        "application/json",
        "schema",
        "$ref"
      ],
      "message": "ENOENT: no such file or directory, open '/home/llin/spectral-comment-action/sample/spec/schemas/foobar.yml'",
      "severity": 0,
      "range": {
        "start": {
          "line": 0,
          "character": 0
        },
        "end": {
          "line": 0,
          "character": 0
        }
      }
    },
    {
      "code": "api-servers",
      "path": [],
      "message": "OpenAPI `servers` must be present and non-empty array.",
      "severity": 1,
      "range": {
        "start": {
          "line": 0,
          "character": 0
        },
        "end": {
          "line": 19,
          "character": 47
        }
      }
    },
    {
      "code": "info-description",
      "path": [
        "info"
      ],
      "message": "OpenAPI object info `description` must be present and non-empty string.",
      "severity": 1,
      "range": {
        "start": {
          "line": 1,
          "character": 5
        },
        "end": {
          "line": 7,
          "character": 16
        }
      }
    }
  ];
  const pbsFoobar = [
    {
      "code": "oas3-schema",
      "path": [
        "paths",
        "/foobar",
        "get",
        "responses",
        "200"
      ],
      "message": "/paths//foobar/get/responses/200 should have required property '$ref'",
      "severity": 0,
      "range": {
        "start": {
          "line": 3,
          "character": 10
        },
        "end": {
          "line": 7,
          "character": 51
        }
      }
    },
    {
      "code": "operation-description",
      "path": [
        "paths",
        "/foobar",
        "get"
      ],
      "message": "Operation `description` must be present and non-empty string.",
      "severity": 1,
      "range": {
        "start": {
          "line": 1,
          "character": 6
        },
        "end": {
          "line": 7,
          "character": 51
        }
      }
    },
    {
      "code": "operation-operationId",
      "path": [
        "paths",
        "/foobar",
        "get"
      ],
      "message": "Operation should have an `operationId`.",
      "severity": 1,
      "range": {
        "start": {
          "line": 1,
          "character": 6
        },
        "end": {
          "line": 7,
          "character": 51
        }
      }
    },
    {
      "code": "operation-tags",
      "path": [
        "paths",
        "/foobar",
        "get"
      ],
      "message": "Operation should have non-empty `tags` array.",
      "severity": 1,
      "range": {
        "start": {
          "line": 1,
          "character": 6
        },
        "end": {
          "line": 7,
          "character": 51
        }
      }
    }
  ];

  let processedPbs = processPbs('/home/llin/spectral-comment-action/sample/spec/openapi.yml', initProcessedPbs(), pbsOpenApi);
  processedPbs = processPbs('/home/llin/spectral-comment-action/sample/spec/paths/foobar.yml', processedPbs, pbsFoobar);
  expect(processedPbs).not.toBeNull();
  expect(processedPbs.severitiesCount['0']).toBe(2);
  expect(processedPbs.severitiesCount['1']).toBe(5);
  expect(processedPbs.severitiesCount['2']).toBe(0);
  expect(processedPbs.severitiesCount['3']).toBe(0);
  expect(processedPbs.filteredPbs['/home/llin/spectral-comment-action/sample/spec/openapi.yml']).not.toBeNull();
  expect(processedPbs.filteredPbs['/home/llin/spectral-comment-action/sample/spec/openapi.yml'].length).toBe(3);
  expect(processedPbs.filteredPbs['/home/llin/spectral-comment-action/sample/spec/paths/foobar.yml']).not.toBeNull();
  expect(processedPbs.filteredPbs['/home/llin/spectral-comment-action/sample/spec/paths/foobar.yml'].length).toBe(4);
});

test('append an error', () => {
  let processedPbs = initProcessedPbs();
  processedPbs.filteredPbs['/home/llin/spectral-comment-action/sample/spec/openapi.yml'] = [
    {
      "code": "info-description",
      "path": [
        "info"
      ],
      "message": "OpenAPI object info `description` must be present and non-empty string.",
      "severity": 1,
      "range": {
        "start": {
          "line": 1,
          "character": 5
        },
        "end": {
          "line": 7,
          "character": 16
        }
      }
    }
  ];
  processedPbs.severitiesCount['1']++;
  const pbs = [
    {
      "code": "invalid-ref",
      "path": [
        "foobar",
        "get",
        "responses",
        "200",
        "content",
        "application/json",
        "schema",
        "$ref"
      ],
      "message": "ENOENT: no such file or directory, open '/home/llin/spectral-comment-action/sample/spec/schemas/foobar.yml'",
      "severity": 0,
      "range": {
        "start": {
          "line": 0,
          "character": 0
        },
        "end": {
          "line": 0,
          "character": 0
        }
      }
    }
  ];
  processedPbs = processPbs('/home/llin/spectral-comment-action/sample/spec/openapi.yml', processedPbs, pbs);
  expect(processedPbs).not.toBeNull();
  expect(processedPbs.severitiesCount['0']).toBe(1);
  expect(processedPbs.severitiesCount['1']).toBe(1);
  expect(processedPbs.severitiesCount['2']).toBe(0);
  expect(processedPbs.severitiesCount['3']).toBe(0);
  expect(processedPbs.filteredPbs['/home/llin/spectral-comment-action/sample/spec/openapi.yml']).not.toBeNull();
  expect(processedPbs.filteredPbs['/home/llin/spectral-comment-action/sample/spec/openapi.yml'].length).toBe(2);
});
