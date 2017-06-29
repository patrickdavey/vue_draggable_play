var originalData = {
  id: 1,
  type: "container",
  order: 0,
  nodes: [
    {
      id: 3,
      type: "container",
      order: 1,
      nodes: []
    },

    {
      id: 4,
      type: "container",
      order: 2,
      nodes: [{
        id: 11,
        type: "container",
        order: 1,
        nodes: [

          {
            id: 12,
            type: "document-problem",
            image: "//d241umpdvf5e0e.cloudfront.net/thumbs/19205285.png",
            order: 1
          }
        ]
      }]
    },

    {
      id: 5,
      type: "container",
      order: 3,
      nodes: [

        {
          id: 6,
          type: "document-problem",
          image: "//d241umpdvf5e0e.cloudfront.net/thumbs/-1199737289.png",
          order: 1
        },
        {
          id: 7,
          type: "document-problem",
          image: "//d241umpdvf5e0e.cloudfront.net/thumbs/-98607187.png",
          order: 2
        },

        {
          id: 8,
          type: "document-problem",
          image: "//d241umpdvf5e0e.cloudfront.net/thumbs/195293287.png",
          order: 3
        },

        {
          type: "document-problem",
          id: 9,
          image: "//d241umpdvf5e0e.cloudfront.net/thumbs/-212203377.png",
          order: 4
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
