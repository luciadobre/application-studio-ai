const emptyData = {
  name: "",
  summary: "",
  experience: [],
  skills: [],
  education: [],
};

function SectionTitle({ children }) {
  return (
    <h2 className="border-b-2 border-app-panel pb-2 font-serif text-lg font-bold uppercase tracking-wide text-app-panel">
      {children}
    </h2>
  );
}

export default function TemplateClassic({ data = emptyData }) {
  const cv = { ...emptyData, ...data };

  return (
    <div className="w-a4 min-h-a4 bg-app-text px-16 py-14 text-app-panel shadow-sm">
      <header className="text-center">
        <h1 className="font-serif text-5xl font-bold tracking-normal">
          {cv.name || "Your Name"}
        </h1>
        {cv.summary && (
          <p className="mx-auto mt-5 max-w-3xl text-cv leading-7 text-app-canvas">
            {cv.summary}
          </p>
        )}
      </header>

      <main className="mt-11 grid grid-cols-cvClassic gap-10">
        <aside className="space-y-9">
          <section>
            <SectionTitle>Skills</SectionTitle>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-app-canvas">
              {cv.skills.map((skill, index) => (
                <li key={`${skill}-${index}`}>{skill}</li>
              ))}
            </ul>
          </section>

          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="mt-4 space-y-5">
              {cv.education.map((item, index) => (
                <article key={`${item.school}-${item.degree}-${index}`}>
                  <h3 className="text-sm font-bold text-app-panel">
                    {item.degree}
                  </h3>
                  <p className="text-sm leading-5 text-app-canvas">
                    {item.school}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-app-canvas">
                    {item.dates}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </aside>

        <section>
          <SectionTitle>Professional Experience</SectionTitle>
          <div className="mt-5 space-y-8">
            {cv.experience.map((item, index) => (
              <article key={`${item.company}-${item.title}-${index}`}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-app-panel">
                      {item.title}
                    </h3>
                    <p className="font-serif text-base italic text-app-canvas">
                      {item.company}
                    </p>
                  </div>
                  <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-app-canvas">
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
      </main>
    </div>
  );
}
