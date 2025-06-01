export default async function ctc(text: string) {
  await navigator.clipboard.writeText(text);
}
