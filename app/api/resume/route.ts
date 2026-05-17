export const runtime = 'nodejs';

function escapePdfText(text: string) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

export async function GET() {
  const lines = [
    'Pranshu Dwivedi',
    'Backend Developer',
    'Java | Spring Boot | Docker | MySQL | DSA',
    'Scalable systems, secure APIs, and modern cloud-ready engineering.',
    'Portfolio website: Next.js + Tailwind CSS + Framer Motion'
  ];

  const stream = [
    'BT',
    '/F1 24 Tf',
    '72 740 Td',
    `(${escapePdfText(lines[0])}) Tj`,
    '0 -34 Td',
    '/F1 14 Tf',
    `(${escapePdfText(lines[1])}) Tj`,
    '0 -24 Td',
    `(${escapePdfText(lines[2])}) Tj`,
    '0 -24 Td',
    `(${escapePdfText(lines[3])}) Tj`,
    '0 -24 Td',
    `(${escapePdfText(lines[4])}) Tj`,
    'ET'
  ].join('\n');

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  const xrefLines = ['xref', `0 ${objects.length + 1}`, '0000000000 65535 f '];
  for (let index = 1; index < offsets.length; index += 1) {
    xrefLines.push(`${offsets[index].toString().padStart(10, '0')} 00000 n `);
  }

  pdf += `${xrefLines.join('\n')}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Pranshu_Dwivedi_Resume.pdf"',
      'Cache-Control': 'no-store'
    }
  });
}
