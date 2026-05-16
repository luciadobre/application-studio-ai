const emptyData = {
  name: "",
  summary: "",
  experience: [],
  skills: [],
  education: [],
};

function SectionHeading({ children }) {
  return (
    <h2 className="text-xs font-black uppercase tracking-label text-app-panel">
      {children}
    </h2>
  );
}

export default function TemplateBold({ data = emptyData }) {
  const cv = { ...emptyData, ...data };

  return (
    <div className="w-a4 min-h-a4 bg-app-text text-app-panel shadow-sm">
      <header className="bg-app-panel px-16 py-14 text-app-text">
        <p className="text-xs font-semibold uppercase tracking-display text-app-accent">
          Curriculum Vitae
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-normal">
          {cv.name || "Your Name"}
        </h1>
        {cv.summary && (
          <p className="mt-6 max-w-3xl text-cv leading-7 text-app-muted">
            {cv.summary}
          </p>
        )}
      </header>

      <main className="grid grid-cols-cvBold gap-10 px-16 py-12">
        <section className="space-y-8">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-7">
            {cv.experience.map((item, index) => (
              <article
                key={`${item.company}-${item.title}-${index}`}
                className="border-l-4 border-app-accent pl-5"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-lg font-extrabold text-app-panel">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-app-canvas">
                      {item.company}
                    </p>
                  </div>
                  <p className="shrink-0 rounded bg-app-accent px-2 py-1 text-xs font-bold uppercase tracking-wide text-app-panel">
                    {item.dates}
                  </p>
                </div>
                {item.bullets?.length > 0 && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-app-panel">
                    {item.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-10">
          <section>
            <SectionHeading>Skills</SectionHeading>
            <div className="mt-4 flex flex-wrap gap-2">
              {cv.skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-sm bg-app-text px-3 py-2 text-xs font-bold text-app-panel shadow-sm ring-1 ring-app-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading>Education</SectionHeading>
            <div className="mt-4 space-y-5">
              {cv.education.map((item, index) => (
                <article
                  key={`${item.school}-${item.degree}-${index}`}
                  className="bg-app-text p-4 shadow-sm ring-1 ring-app-muted"
                >
                  <h3 className="text-sm font-extrabold text-app-panel">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm text-app-canvas">{item.school}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-app-panel">
                    {item.dates}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
