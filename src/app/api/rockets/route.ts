import { Rocket } from "../../util/types";

export async function getRockets() {
  const res = await fetch("https://api.spacexdata.com/v4/rockets");
  const data: Rocket[] = await res.json();
  return data;
}
