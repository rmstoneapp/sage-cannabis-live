// app/api/strains/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.strainName || !data.brandName || !data.strainType) {
      return NextResponse.json(
        { error: 'Missing required fields: strainName, brandName, strainType' },
        { status: 400 }
      );
    }

    // Create the strain in the database
    const strain = await prisma.strain.create({
      data: {
        strainName: data.strainName,
        brandName: data.brandName,
        strainType: data.strainType.toUpperCase(), // Convert to enum format
        dispensary: data.dispensary || null,
        thcPercentage: data.thcPercentage ? parseFloat(data.thcPercentage) : null,
        cbdPercentage: data.cbdPercentage ? parseFloat(data.cbdPercentage) : null,
        cbgPercentage: data.cbgPercentage ? parseFloat(data.cbgPercentage) : null,
        cbnPercentage: data.cbnPercentage ? parseFloat(data.cbnPercentage) : null,
        effects: data.effects || [],
        medicalUses: data.medicalUses || [],
        description: data.description || null,
        flavorProfile: data.flavorProfile || null,
        aroma: data.aroma || null,
        
        // Images from UploadThing
        containerImage: data.images?.container || null,
        terpeneImage: data.images?.terpene || null,
        cannabinoidImage: data.images?.cannabinoid || null,
        budImage: data.images?.bud || null,
        
        // Submission tracking
        submitterEmail: data.submitterEmail || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      strainId: strain.id,
      message: 'Strain submitted successfully for review!',
    });

  } catch (error) {
    console.error('Error creating strain:', error);
    return NextResponse.json(
      { error: 'Failed to submit strain' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const strains = await prisma.strain.findMany({
      where: status ? { status: status as any } : { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        strainName: true,
        brandName: true,
        strainType: true,
        thcPercentage: true,
        cbdPercentage: true,
        effects: true,
        medicalUses: true,
        description: true,
        budImage: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ strains });
  } catch (error) {
    console.error('Error fetching strains:', error);
    return NextResponse.json(
      { error: 'Failed to fetch strains' },
      { status: 500 }
    );
  }
}