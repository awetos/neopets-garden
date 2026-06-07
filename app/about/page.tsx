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
      <p>
        I just liked Neocities and have a couple sites here. React is easy to
        develop in and I was simply used to it. I was ecstatic to know I could
        export directly to Neocities. I know a lot of Neocities users love
        Neopets.
      </p>
      <Heading title="Why Firebase and Not Postgres or SQL?"></Heading>
      <p>
        Because I am dumb. I have used Postgres (Neon, Supabase) another
        project, and then I thought, I want to learn Firebase and began using it
        here. Turns out, NoSQL / documents and collections are terrible for
        stats like this. I liked Firebase because it comes with user auth if I
        wanted to develop sites with login and moderation.
      </p>
      <p>
        If this site reaches 10,000+ seeds stored, I might began a migration and
        conversion to a Postgres / SQL provider.
      </p>
      <Heading title="What is the free tier quota for Firebase?"></Heading>
      <p>
        If things are not submitting or the database is not loading, it's
        possible the quota was exceeded. I included a bit of error handling, but
        for the most part I don't think we will reach that quota so my error
        handling is fast and loose.
      </p>
      <p>There are 20,000 writes and 50,000 reads a day.</p>
      <p>Each search results page costs 20 reads. </p>
      <p>
        Each write, actually costs 4 writes and not 1, an update to global
        stats, raw submissions, items, seeds.
      </p>
      <p>
        <b>Global Stats: </b> rather than counting all the data every time we
        want stats, I just have 1 document keeping track of some global stats
        for quick stat reads.
      </p>
      <p>
        <b>Raw Submissions: </b> Saves the raw submission data.
      </p>
      <p>
        <b>Items: </b> rather than searching every submission's item name, we
        first check the item list to see if there is an entry there. Then,
        knowing it exists, we go ask the raw submissions for the documents that
        have this item.
      </p>
      <p>
        <b>Seeds:</b> another index for quick stats.
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
