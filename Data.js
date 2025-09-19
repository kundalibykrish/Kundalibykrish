const jyotishData = {
  // Planetary relationships: friend, enemy, neutral
  grahaRelationships: {
    surya: {
      mitra: ["chandra", "mangal", "guru"],
      shatru: ["shukra", "shani", "rahu"],
      sam: ["budh"]
    },
    chandra: {
      mitra: ["surya", "budh"],
      shatru: ["rahu"],
      sam: ["mangal", "guru", "shukra", "shani"]
    },
    mangal: {
      mitra: ["surya", "chandra", "guru"],
      shatru: ["budh", "rahu"],
      sam: ["shukra", "shani"]
    },
    budh: {
      mitra: ["surya", "shukra", "rahu"],
      shatru: ["chandra"],
      sam: ["mangal", "guru", "shani"]
    },
    guru: {
      mitra: ["surya", "chandra", "mangal"],
      shatru: ["budh", "shukra", "rahu"],
      sam: ["shani"]
    },
    shukra: {
      mitra: ["budh", "shani", "rahu"],
      shatru: ["surya", "chandra"],
      sam: ["mangal", "guru"]
    },
    shani: {
      mitra: ["budh", "shukra"],
      shatru: ["surya", "chandra", "mangal"],
      sam: ["guru"]
    },
    rahu: {
      mitra: ["budh", "shukra"],
      shatru: ["surya", "chandra", "mangal", "guru"],
      sam: []
    },
    ketu: {
      mitra: ["budh", "shukra"],
      shatru: ["surya", "chandra", "mangal", "guru"],
      sam: []
    }
  },

  // Planetary Rashi status: exaltation, debilitation, own, neutral
  grahaStatus: {
    surya: {
      uchha: 1, // Mesh
      swagriha: [5], // Sinha
      nicha: 7, // Tula
      sam: [6] // Kanya
    },
    chandra: {
      uchha: 2, // Vrishabh
      swagriha: [4], // Karkat
      nicha: 8, // Vrishchik
      sam: [3] // Mithun
    },
    mangal: {
      uchha: 10, // Makar
      swagriha: [1, 8], // Mesh, Vrishchik
      nicha: 4, // Karkat
      sam: [3, 6] // Mithun, Kanya
    },
    guru: {
      uchha: 4, // Karkat
      swagriha: [9, 12], // Dhanu, Meen
      nicha: 10, // Makar
      sam: [1] // Mesh
    },
    budh: {
      uchha: 6, // Kanya
      swagriha: [3, 6], // Mithun, Kanya
      nicha: 12, // Meen
      sam: [1, 2] // Mesh, Vrishabh
    },
    shukra: {
      uchha: 12, // Meen
      swagriha: [2, 7], // Vrishabh, Tula
      nicha: 6, // Kanya
      sam: []
    },
    shani: {
      uchha: 7, // Tula
      swagriha: [10, 11], // Makar, Kumbha
      nicha: 1, // Mesh
      sam: [9] // Dhanu
    },
    rahu: {
      uchha: 3, // Mithun
      swagriha: [6], // Kanya
      nicha: [5, 9], // Sinha, Dhanu
      sam: []
    },
    ketu: {
      uchha: 9, // Dhanu
      swagriha: [12], // Meen
      nicha: [2, 3], // Vrishabh, Mithun
      sam: []
    }
  },

  // Rashi-specific planetary relationships
  rashiRelationships: {
    surya: {
      shatruRashi: [2, 3, 10, 11],
      mitraRashi: [4, 5, 9, 12]
    },
    chandra: {
      shatruRashi: [6, 10, 11],
      mitraRashi: [1, 4, 5, 9, 12]
    },
    mangal: {
      shatruRashi: [2, 11],
      mitraRashi: [3, 4, 5, 9, 12]
    },
    guru: {
      shatruRashi: [2, 6, 11],
      mitraRashi: [1, 3, 4, 5, 6]
    },
    budh: {
      shatruRashi: [2, 7, 10, 11],
      mitraRashi: [4, 5, 8, 9]
    },
    shukra: {
      shatruRashi: [3, 10, 11],
      mitraRashi: [1, 4, 5, 8, 9]
    },
    shani: {
      shatruRashi: [2, 3, 6],
      mitraRashi: [4, 5, 9, 12]
    },
    rahu: {
      shatruRashi: [1, 4, 5, 12],
      mitraRashi: [2, 6, 9, 10, 11]
    },
    ketu: {
      shatruRashi: [1, 4, 5, 8],
      mitraRashi: [6, 9, 10, 11]
    }
  },

  // Planetary aspects
  grahaDrishti: {
    common: [7], // All grahas aspect the 7th house
    mangal: [4, 8],
    shani: [3, 10],
    guru: [5, 9],
    rahu: [5, 9],
    ketu: [5, 9]
  }
};
    
