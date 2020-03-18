const toMarkdown = require('../src/to_markdown');

test('no errors (i.e. empty array)', async () => {
  const md = await toMarkdown({filteredPbs:{}, severitiesCount:{}});
  expect(md).not.toBeNull();
  expect(md).toBe('');
});

test('1 errors', async () => {
  const results = {
    "filteredPbs": {
      "/home/llin/spectral-comment-action/sample/spec/openapi.yml": [
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
          },
          "source": "/home/llin/spectral-comment-action/sample/spec/openapi.yml"
        }
      ]
    },
    "severitiesCount": {
      "0": 1,
      "1": 0,
      "2": 0,
      "3": 0
    }
  };

  let md = await toMarkdown(results, {
    githubURL: 'https://github.com',
    repository: 'l-lin/spectral-comment-action',
    headRef: 'test-comment-pr',
    workspace: '/home/llin/spectral-comment-action'
  });
  expect(md).not.toBeNull();
  expect(md).toBe(`<details>
<summary>OpenAPI lint errors: 1 problems (1 errors, 0 warnings, 0 infos, 0 hints)</summary>

> sample/spec/openapi.yml

|Range|Severity|Code|Message|
|-----|--------|----|-------|
|[sample/spec/openapi.yml:1:1](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr/sample/spec/openapi.yml#L1)|:x:|invalid-ref|ENOENT: no such file or directory, open '/home/llin/spectral-comment-action/sample/spec/schemas/foobar.yml'|

</details>`);
});

test('multiple errors', async () => {
  const pbs = {
    "filteredPbs": {
      "/home/llin/spectral-comment-action/sample/spec/openapi.yml": [
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
          },
          "source": "/home/llin/spectral-comment-action/sample/spec/openapi.yml"
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
          },
          "source": "/home/llin/spectral-comment-action/sample/spec/openapi.yml"
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
          },
          "source": "/home/llin/spectral-comment-action/sample/spec/openapi.yml"
        }
      ],
      "/home/llin/spectral-comment-action/sample/spec/paths/foobar.yml": [
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
          },
          "source": "/home/llin/spectral-comment-action/sample/spec/paths/foobar.yml"
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
          },
          "source": "/home/llin/spectral-comment-action/sample/spec/paths/foobar.yml"
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
          },
          "source": "/home/llin/spectral-comment-action/sample/spec/paths/foobar.yml"
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
          },
          "source": "/home/llin/spectral-comment-action/sample/spec/paths/foobar.yml"
        }
      ]
    },
    "severitiesCount": {
      "0": 2,
      "1": 5,
      "2": 0,
      "3": 0
    }
  };
  let md = await toMarkdown(pbs, {
    githubURL: 'https://github.com',
    repository: 'l-lin/spectral-comment-action',
    headRef: 'test-comment-pr',
    workspace: '/home/llin/spectral-comment-action'
  });
  expect(md).not.toBeNull();
  expect(md).toBe(`<details>
<summary>OpenAPI lint errors: 7 problems (2 errors, 5 warnings, 0 infos, 0 hints)</summary>

> sample/spec/openapi.yml

|Range|Severity|Code|Message|
|-----|--------|----|-------|
|[sample/spec/openapi.yml:1:1](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr/sample/spec/openapi.yml#L1)|:x:|invalid-ref|ENOENT: no such file or directory, open '/home/llin/spectral-comment-action/sample/spec/schemas/foobar.yml'|
|[sample/spec/openapi.yml:1:1](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr/sample/spec/openapi.yml#L1)|:warning:|api-servers|OpenAPI \`servers\` must be present and non-empty array.|
|[sample/spec/openapi.yml:2:6](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr/sample/spec/openapi.yml#L2)|:warning:|info-description|OpenAPI object info \`description\` must be present and non-empty string.|

> sample/spec/paths/foobar.yml

|Range|Severity|Code|Message|
|-----|--------|----|-------|
|[sample/spec/paths/foobar.yml:4:11](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr/sample/spec/paths/foobar.yml#L4)|:x:|oas3-schema|/paths//foobar/get/responses/200 should have required property '$ref'|
|[sample/spec/paths/foobar.yml:2:7](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr/sample/spec/paths/foobar.yml#L2)|:warning:|operation-description|Operation \`description\` must be present and non-empty string.|
|[sample/spec/paths/foobar.yml:2:7](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr/sample/spec/paths/foobar.yml#L2)|:warning:|operation-operationId|Operation should have an \`operationId\`.|
|[sample/spec/paths/foobar.yml:2:7](https://github.com/l-lin/spectral-comment-action/blob/test-comment-pr/sample/spec/paths/foobar.yml#L2)|:warning:|operation-tags|Operation should have non-empty \`tags\` array.|

</details>`);
});

