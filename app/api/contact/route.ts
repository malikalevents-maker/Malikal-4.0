import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Contact from '@/models/Contact'

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB()

    // Parse request body
    const body = await request.json()
    const { fullName, phoneNumber, email, eventType, message } = body

    // Validate required fields
    if (!fullName || !phoneNumber || !email || !eventType || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create new contact entry
    const contact = new Contact({
      fullName,
      phoneNumber,
      email,
      eventType,
      message
    })

    // Save to database
    await contact.save()

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully!',
        contactId: contact._id 
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Contact form error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    
    // Get all contacts (for admin use)
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json({ contacts })
  } catch (error) {
    console.error('Get contacts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}