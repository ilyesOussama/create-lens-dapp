import { NextResponse, NextRequest } from "next/server";
import Bundlr from "@bundlr-network/client";

const TOP_UP = "100000000000000000";
const MIN_FUNDS = 0.05;

export async function POST(req: NextRequest) {
  const data = await req.json();
  const bundlr = new Bundlr(
    "http://node1.bundlr.network",
    "matic",
    process.env.BNDLR_KEY
  );
  await bundlr.ready();
  let balance = await bundlr.getLoadedBalance();
  let readableBalance = bundlr.utils.fromAtomic(balance).toNumber();

  if (readableBalance < MIN_FUNDS) {
    await bundlr.fund(TOP_UP);
  }

  const tx = await bundlr.upload(JSON.stringify(data), {
    tags: [{ name: "Content-Type", value: "application/json" }],
  });

  return NextResponse.json({ url: `https://arweave.net/${tx.id}` });
}
