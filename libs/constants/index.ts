import { NextResponse } from 'next/server'

export const _200 = (message: string) => new NextResponse(message, { status: 200 })
export const _201 = (json: any) => NextResponse.json(json, { status: 201 })

export const _400 = () => new NextResponse('Invalid Request', { status: 400 })
export const _401 = () => new NextResponse('Unauthorized User', { status: 401 })
export const _409 = (message: string) => new NextResponse(message, { status: 409 })

export const _500 = () => new NextResponse('Internal Server Error', { status: 500 })
