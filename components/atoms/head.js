import NextHead from "next/head";
import GoogleFonts from "next-google-fonts";

const Head = ({ children, title = "Boltmode Labs — Product studio" }) => (
  <>
    <GoogleFonts href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&display=swap" />
    <NextHead>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      <title>{title}</title>

      {children}
    </NextHead>
  </>
)

export default Head