"use client";
import { Launch, Rocket } from "../util/types";
import { getLaunchesSearch } from "../api/launches/route";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { error } from "console";
export default function Launches({
  launches,
  rockets,
}: {
  launches: Launch[];
  rockets: Rocket[];
}) {
  const [enabled, setEnabled] = useState(false);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["launches", searchTerm],
    queryFn: () => getLaunchesSearch({ search: searchTerm }),
    initialData: launches,
    enabled: enabled,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setEnabled(false);
  };

  const onSubmit = () => {
    setSearchTerm(query);
    setEnabled(true);
  };

  function handleDetails(event: any, launch: Launch) {
    event.preventDefault();
    // todo redirect to details page
  }

  if (data) {
    launches = data;
  }
  if (isLoading) return <p>Loading...</p>;
  if (isError || errors) return <p>Error</p>;
  return (
    <div className="flex flex-col w-full py-2">
      <div className="py-2">
        {/* <label
          htmlFor="search"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Search
        </label> */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            autoComplete="off"
            type="search"
            name="search"
            id="search"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder=""
            value={query}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {launches.map((launch) => (
          <li
            key={launch.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <Image
                width={124}
                height={124}
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                src={
                  launch?.links?.patch?.small?.toString() ||
                  "/patch_placeholder.webp"
                }
                alt=""
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {launch.name}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Details</dt>
                <dd className="text-sm text-gray-500">
                  {launch.detailsExcerpt}
                </dd>
                <dt className="sr-only">Success?</dt>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Success: {launch.success ? "Yes" : "No"}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={``}
                    onClick={(e) => handleDetails(e, launch)}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    {/* <EnvelopeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    /> */}
                    Details
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`${launch.links.article}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    {/* <PhoneIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    /> */}
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
