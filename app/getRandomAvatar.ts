// import { createAvatar } from "@dicebear/core";
// import { pixelArt } from "@dicebear/collection";
import axios from "axios";
import fs from "fs";

import { uuidType } from "../types";

export default async function getRandomAvatar(seed: uuidType) {
  // const avatar = createAvatar(pixelArt, {
  //   seed,

  //   // ... other options
  // });

  // const avatar = await axios.get(`https://avatars.dicebear.com/api/pixel-art/${seed}.svg`);
  // const svg = avatar.toString();
  try {
    // const svg = await axios.get(`https://api.dicebear.com/6.x/micah/svg?seed=${seed}`).then((res) => res.data);
    const svg = await axios
      .get(`https://api.dicebear.com/6.x/pixel-art/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`)
      .then((res) => res.data);

    return svg;
  } catch (err) {
    return fs.readFileSync("./backupAvatar.txt").toString();
  }
}
// getRandomAvatar("test");
