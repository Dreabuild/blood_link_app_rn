export const toBn = (n: string) =>
  n.replace(/\d/g, (d: any) => '০১২৩৪৫৬৭৮৯'[d]);
