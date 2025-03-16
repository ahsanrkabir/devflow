import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getHotQuestions } from "@/lib/actions/question.action";

import TagCard from "../cards/TagCard";
import DataRenderer from "../DataRenderer";

const popularTags = [
  { _id: "1", name: "React", questions: 100 },
  { _id: "2", name: "Next.js", questions: 90 },
  { _id: "3", name: "TypeScript", questions: 80 },
  { _id: "4", name: "JavaScript", questions: 70 },
  { _id: "5", name: "Node.js", questions: 60 },
  { _id: "6", name: "React Query", questions: 60 },
];

const RightSidebar = async () => {
  const { success, data: hotQuestions, error } = await getHotQuestions();

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-28 shadow-light-300 dark:shadow-none max-xl:hidden">
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
                    <Image
                      src="/icons/eye.svg"
                      alt="Chevron"
                      width={20}
                      height={20}
                      className="invert-colors"
                    />
                    <p className="small-medium text-light400_light500">
                      {views}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        />
      </div>

      <div className="mt-8">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-5 flex flex-col gap-4">
          {popularTags.map(({ _id, name, questions }) => (
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
      </div>
    </section>
  );
};

export default RightSidebar;
