const RESOURCE_CONFIG = {
  titiStation: {
    stationId: "162cdd3f-c666-46b4-8412-a998dd54ff76",
    background: "https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/scene.svg",
    trees: "https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/tree.svg",
    bush1: "https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/bush1.svg",
    bush2: "https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/bush2.svg",
    obstacle: "https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/obstacle.svg",
    obstacleHeight: 187,
    obstacleWidth: 253,
    checkpoints:
    ['0f65a854-4895-4b64-828a-d1505e92dbfe', '29ff798a-4ec9-414d-ad28-b70c8d43aae7', '4560b48d-3509-4faf-b92f-1ec1f61ccf40', '7910659b-7d97-43df-9403-660be15d9c3b', 'c68d7e1c-b874-4f43-b9e2-bd2cae3b9457', 'cfce72a3-c24b-4614-93e6-e9d2c14e9ae3' ]

  },
  nutriStation: {
    stationId: "c5a0d2fb-eb97-4225-a025-a4f4844b1a55",
    background: "https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/2nd_scene.svg",
    trees: "https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/GranCoral.svg",
    bush1: "https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/brush3.svg",
    bush2: "https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/brush4.svg",
    obstacle: "https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/obstable2.png",
    obstacleHeight: 173,
    obstacleWidth: 167,
    checkpoints: [
        '12173f22-fc64-4a45-a669-3ab5649491ae',
        'debd4bb0-49b3-45df-ac39-aa5a9dde2d15',
        'b8c8ce7b-660e-446f-bbb5-79acc72003bd'
    ]
  }
};


export let currentStation = "titiStation";

export function setStation(station) {
  currentStation = station;
}

export function getResource(key) {
  return RESOURCE_CONFIG[currentStation][key];
}
