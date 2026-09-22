import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query",
      "kind": "OBJECT"
    },
    "mutationType": {
      "name": "Mutation",
      "kind": "OBJECT"
    },
    "subscriptionType": {
      "name": "Subscription",
      "kind": "OBJECT"
    },
    "types": [
      {
        "kind": "OBJECT",
        "name": "CreateStudentPayload",
        "fields": [
          {
            "name": "query",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "name": "Query",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "student",
            "type": {
              "kind": "OBJECT",
              "name": "Student",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "createStudent",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "name": "CreateStudentPayload",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateStudent",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "name": "UpdateStudentPayload",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INTERFACE",
        "name": "Node",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Student"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "me",
            "type": {
              "kind": "OBJECT",
              "name": "Student",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "INTERFACE",
              "name": "Node",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "name": "Node",
                  "kind": "INTERFACE",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "student",
            "type": {
              "kind": "OBJECT",
              "name": "Student",
              "ofType": null
            },
            "args": [
              {
                "name": "studentId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Student",
        "fields": [
          {
            "name": "afterApprenticeShip",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "certificates",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "name": "StudentCertificates",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "credential",
            "type": {
              "kind": "OBJECT",
              "name": "StudentCredential",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "line",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "mediaLinks",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "name": "StudentSocialMedia",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "profileImage",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "wantedTrade",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "StudentCertificates",
        "fields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "student",
            "type": {
              "kind": "OBJECT",
              "name": "Student",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "studentId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "StudentCredential",
        "fields": [
          {
            "name": "passwordHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "student",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "name": "Student",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "studentId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "StudentSocialMedia",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "mediaUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "student",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "name": "Student",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "studentId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Subscription",
        "fields": [
          {
            "name": "onStudentCreated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "name": "Student",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpdateStudentPayload",
        "fields": [
          {
            "name": "query",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "name": "Query",
                "kind": "OBJECT",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "student",
            "type": {
              "kind": "OBJECT",
              "name": "Student",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;