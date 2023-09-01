import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest,) {
    const { searchParams } = new URL(request.url!)
    const text = searchParams.get('text')
    const response = await fetch(
        `http://host.docker.internal:3000/places?text=${text}`,
        {
            next: {
                revalidate: 1
            }
        }
    )
    return NextResponse.json(await response.json());
}