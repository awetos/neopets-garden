import Heading from "@/components/about/heading";

export default function About() {
  return (
    <div className="space-y-2">
      <p>
        Most design decisions are based on the fact that{" "}
        <span className="line-through">I am cheap</span> I am using the free
        tier of Firebase and this is for practice.
      </p>
      <Heading title="Why NextJS / Tailwind / and static export?"></Heading>
      <p>I just liked Neocities and I'm used to React.</p>
      <Heading title="Why Firebase and Not Postgres or SQL?"></Heading>
      <p>
        Because I am dumb. I have used Postgres on another project, and then I
        wanted to use Firebase. But it turns out Firebase is bad for this type
        of statistical query.
      </p>
      <p>
        If this site reaches 10,000+ seeds stored, I might began a migration and
        conversion to a Postgres / SQL provider.
      </p>
      <Heading title="What is the free tier quota for Firebase?"></Heading>
      <p>
        If things are not submitting or the database is not loading, it's
        possible the quota was exceeded. I included a bit of error handling, but
        for the most part I don't think we will reach that quota.
      </p>
      <p>There are 20,000 writes and 50,000 reads a day.</p>
      <p>Each search results page costs 20 reads. </p>
      <p>
        Each write, actually costs 4 writes and not 1, an update to global
        stats, raw submissions, items, seeds.
      </p>
      <p>
        <b>Global Stats: </b> 1 document that keeps simple global stats.
      </p>
      <p>
        <b>Raw Submissions: </b> All the raw submission data.
      </p>
      <p>
        <b>Items: </b> List of items that appear for indexing.
      </p>
      <p>
        <b>Seeds:</b> An index for some quick stats on each seed.
      </p>
      <Heading title="Why are there no pages?"></Heading>
      <p>
        Showing "results 1 - 20 of 1,234" or "page 1 of 20" would be nice, but
        based on how Firebase prices reading from their database, I cannot show
        you that. The way the database is structured is 20 entries for 20 reads
        whether it's entries 1 - 20 or 9,990 - 1,000, but showing 1 - 20 of
        1,234 results would become 1,234 reads, because Firebase "walks" through
        all the documents. If there is a way around that, please contact me.
      </p>
    </div>
  );
}
