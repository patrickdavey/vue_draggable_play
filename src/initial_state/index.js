var originalData = {
  id: 1,
  type: "container",
  open: true,
  directions: "",
  order: 0,
  name: "",
  nodes: [
    {
      id: 3,
      type: "container",
      open: true,
      directions: "",
      order: 0,
      name: "",
      nodes: []
    },

    {
      id: 4,
      type: "container",
      open: true,
      directions: "",
      order: 1,
      name: "",
      nodes: [{
        id: 11,
        type: "container",
        open: true,
        directions: "",
        order: 0,
        name: "",
        nodes: [

          {
            id: 12,
            type: "document-problem",
            image: "//d241umpdvf5e0e.cloudfront.net/thumbs/19205285.png",
            order: 0
          }
        ]
      }]
    },

    {
      id: 5,
      type: "container",
      open: true,
      directions: "",
      order: 2,
      name: "",
      nodes: [

        {
          id: 6,
          type: "document-problem",
          image: "//d241umpdvf5e0e.cloudfront.net/thumbs/-1199737289.png",
          order: 0
        },
        {
          id: 7,
          type: "document-problem",
          image: "//d241umpdvf5e0e.cloudfront.net/thumbs/-98607187.png",
          order: 1
        },

        {
          id: 8,
          type: "document-problem",
          image: "//d241umpdvf5e0e.cloudfront.net/thumbs/195293287.png",
          order: 2
        },

        {
          type: "document-problem",
          id: 9,
          image: "//d241umpdvf5e0e.cloudfront.net/thumbs/-212203377.png",
          order: 3
        }
      ]
    }
  ]
};

import { normalize, schema } from "normalizr";

const nodeSchema = new schema.Entity("nodes", {});
const nodes = new schema.Array(nodeSchema);
nodeSchema.define({ nodes });

// const partContainers = new schema.Array(partContainer);
// partContainer.define({ partContainers });
const normalizedData = normalize(originalData, nodeSchema);

export default normalizedData;
