const emptyData = {
  name: "",
  summary: "",
  experience: [],
  skills: [],
  education: [],
};

export default function TemplateMinimal({ data = emptyData }) {
  const cv = { ...emptyData, ...data };

  return (
    <div className="w-a4 min-h-a4 bg-app-text px-20 py-16 text-app-panel shadow-sm">
      <header className="border-b border-app-muted pb-8">
        <h1 className="text-5xl font-light tracking-normal text-app-panel">
          {cv.name || "Your Name"}
        </h1>
        {cv.summary && (
          <p className="mt-6 max-w-2xl text-cv leading-7 text-app-canvas">
            {cv.summary}
          </p>
        )}
      </header>

      <main className="mt-10 space-y-10">
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-section text-app-canvas">
            Experience
          </h2>
          <div className="mt-5 space-y-7">
            {cv.experience.map((item, index) => (
              <article key={`${item.company}-${item.title}-${index}`}>
                <div className="flex items-baseline justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-app-panel">
                      {item.title}
                    </h3>
                    <p className="text-sm text-app-canvas">{item.company}</p>
                  </div>
                  <p className="shrink-0 text-xs font-medium uppercase tracking-wide text-app-canvas">
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

        <section className="grid grid-cols-cvMinimal gap-12 border-t border-app-muted pt-8">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-section text-app-canvas">
              Education
            </h2>
            <div className="mt-5 space-y-4">
              {cv.education.map((item, index) => (
                <article key={`${item.school}-${item.degree}-${index}`}>
                  <h3 className="text-sm font-semibold text-app-panel">
                    {item.degree}
                  </h3>
                  <p className="text-sm text-app-canvas">{item.school}</p>
                  <p className="text-xs text-app-canvas">{item.dates}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-section text-app-canvas">
              Skills
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {cv.skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="border border-app-muted px-3 py-1 text-xs font-medium text-app-panel"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
