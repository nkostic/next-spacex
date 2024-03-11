import { Launch } from "../../util/types";

export async function getLaunches() {
  const res = await fetch("https://api.spacexdata.com/v4/launches");
  const data: Launch[] = await res.json();
  return await setTheData(data);
}

export async function getLaunchesSearch({ search }: { search: string }) {
  if (!search) return getLaunches();
  const res = await fetch("https://api.spacexdata.com/v4/launches/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        name: search,
      },
      options: {
        pagination: false,
      },
    }),
  });

  const data: any = await res.json();
  const launches: Launch[] = data.docs;
  return await setTheData(launches);
}

const truncate = (input: string) =>
  input?.length > 100 ? `${input.substring(0, 90)}...` : input;

export async function setTheData(data: Launch[]): Promise<Launch[]> {
  data.forEach((element) => {
    element.detailsExcerpt = truncate(element.details);
  });
  return data;
}

export async function getLaunchesByRocket({ rocket }: { rocket: string }) {
  const res = await getLaunches();
  const data: Launch[] = res.filter(
    (launch: Launch) => launch.rocket === rocket
  );
  return data;
}
