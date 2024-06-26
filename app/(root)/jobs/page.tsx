import JobCard from '@/components/cards/JobCard';
import Filter from '@/components/shared/Filter';
import Pagination from '@/components/shared/Pagination';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { CountriesFilters } from '@/constants/countries';
import { getJobs } from '@/lib/actions/job.action';
import { SearchParamsProps } from '@/types';

const Jobs = async ({ searchParams }: SearchParamsProps) => {
  let result = await getJobs({
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 10,
    filter: searchParams.filter,
    searchQuery: searchParams.q,
  });

  // console.log(result?.jobs);

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/jobs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title,Company, or Keywords"
          otherClasses="flex-1 dark:bg-slate-800 dark:text-slate-100"
        />

        <Filter
          filters={CountriesFilters}
          otherClasses="min-h-[56px] sm:min-w-[210px]"
          boxClasses="max-w-[170px] z-[9999] bg-white"
          value="Select Location"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.jobs.length > 0 ? (
          result?.jobs?.map((job: any) => (
            <JobCard
              job_title={job.job_title || ''}
              job_apply_link={job.job_apply_link || ''}
              job_description={job.job_description || ''}
              job_city={job.job_city || ''}
              job_state={job.job_state || ''}
              job_country={job.job_country || ''}
              job_employment_type={job.job_employment_type || ''}
              employer_logo={job.employer_logo || ''}
            />
          ))
        ) : (
          <h1 className="text-center background-light800_dark300 text-light400_light500">
            Oops! We couldn't find any jobs at the moment. Please try again
            later
          </h1>
        )}
      </div>
      <div className="mt-10">
        {result?.jobs.length > 0 && (
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result?.isNext || false}
          />
        )}
      </div>
    </>
  );
};

export default Jobs;
