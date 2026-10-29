import { serializeStructuredData } from "@/lib/seo/structured-data";

type StructuredDataScriptProps = {
  data: Record<string, unknown>;
};

export const StructuredDataScript = ({ data }: StructuredDataScriptProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }}
  />
);
