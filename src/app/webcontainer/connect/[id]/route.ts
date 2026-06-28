// app/webcontainer/connect/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    // This is the key part — you need to validate the connection ID
    // and tell the WebContainer that this tab belongs to your project.

    // Usually you store active WebContainer instances in a Map or Redis
    // keyed by this ID.

    console.log(`WebContainer connect request for ID: ${id}`);

    // Simple success response that WebContainer expects
    return NextResponse.json({
        success: true,
        message: "Connected"
    });
}