import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false, // "Compiling..." indikatorini yashiradi
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);