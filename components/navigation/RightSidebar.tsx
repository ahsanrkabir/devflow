import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopTags } from "@/lib/actions/tag.action";

import TagCard from "../cards/TagCard";
import DataRenderer from "../DataRenderer";

const RightSidebar = async () => {
  const [
    { success, data: hotQuestions, error },
    { success: tagSuccess, data: tags, error: tagError },
  ] = await Promise.all([getHotQuestions(), getTopTags()]);

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="space-y-6">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <DataRenderer
          data={hotQuestions}
          empty={{
            title: "No questions found",
            message: "No questions found. Be the first to ask!",
          }}
          success={success}
          error={error}
          render={(hotQuestions) => (
            <div className="flex w-full flex-col gap-4">
              {hotQuestions.map(({ _id, title, views }) => (
                <Link
                  key={_id}
                  href={ROUTES.QUESTION(_id)}
                  className="flex cursor-pointer items-center justify-between gap-7"
                >
                  <p className="body-medium text-dark500_light700 line-clamp-2">
                    {title}
                  </p>
                  <div className="flex flex-none items-center gap-2">
                    <p className="small-medium text-light400_light500">
                      {views}
                    </p>
                    <Image
                      src="/icons/eye.svg"
                      alt="views"
                      width={18}
                      height={18}
                      className="invert-colors"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        />
      </div>

      <div className="mt-8">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <DataRenderer
          data={tags}
          empty={{
            title: "No Tags found",
            message: "No tags found. Be the first to ask questions!",
          }}
          success={tagSuccess}
          error={tagError}
          render={(tags) => (
            <div className="mt-5 flex flex-col gap-4">
              {tags.map(({ _id, name, questions }) => (
                <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  questions={questions}
                  showCount
                  compact
                />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default RightSidebar;
