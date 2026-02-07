function FAQSection() {
  return (
    <section
      id="faq"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl text-slate-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <FAQItem
            question="How often does the calendar update?"
            answer="Your calendar syncs automatically every hour with the latest events from Sejong Do-Dream system."
          />
          <FAQItem
            question="Do I need to log in or provide personal information?"
            answer="No! This service is completely anonymous. Just configure your filters and use the generated URL."
          />
          <FAQItem
            question="Can I change my filters later?"
            answer="Yes, simply return to this page, reconfigure your settings, and update the calendar URL in your calendar app."
          />
          <FAQItem
            question="Which calendar apps are supported?"
            answer="Any calendar app that supports ICS/iCal subscriptions, including Google Calendar, Apple Calendar, Outlook, and more."
          />
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="bg-white p-6 rounded-lg border border-slate-200 group">
      <summary className="cursor-pointer text-slate-900 list-none flex items-center justify-between">
        <span>{question}</span>
        <span className="text-slate-400 group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>
      <p className="mt-4 text-slate-600 text-sm leading-relaxed">
        {answer}
      </p>
    </details>
  );
}

export { FAQSection };
