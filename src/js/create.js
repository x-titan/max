import { loadJSON } from "./loader.js";
import { obj, objects } from "./objects.js";

export const ratio = {
    x: 21,
    y: 9
}

export function createMap(params) {
    loadJSON('home.json')
        .then(data => {
            console.log(data)

            objects((ob)=>{
                data.layer.forEach(tiles => {
                    tiles.tiles.forEach((tile)=>{
                        // bad algoritm
                        // bugs
                        tile.ranges.forEach((coords)=>{
                            console.log(coords);
                            
                        })
                    })
                });
            })
        })
}