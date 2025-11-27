export interface Diagnosis {
    disease: string;
    confidence: number;
    description: string;
    treatment: string[];
    preventiveMeasures: string[];
}

export interface CropPlan {
    crop: string;
    suitability: number;
    duration: string;
    estimatedYield: string;
    estimatedRevenue: string;
    requirements: string[];
}

export const analyzePlantImage = async (file: File): Promise<Diagnosis> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock response based on random chance or file name
    // In a real app, this would send the file to an API
    return {
        disease: "Early Blight",
        confidence: 0.92,
        description:
            "Early blight is a common fungal disease that affects tomato and potato plants. It is caused by the fungus Alternaria solani.",
        treatment: [
            "Remove and destroy infected leaves.",
            "Apply copper-based fungicides.",
            "Improve air circulation around plants.",
        ],
        preventiveMeasures: [
            "Rotate crops every 2-3 years.",
            "Use disease-resistant varieties.",
            "Water at the base of the plant to keep leaves dry.",
        ],
    };
};

export const generateCropPlan = async (
    soilType: string,
    season: string,
    acres: string
): Promise<CropPlan[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock recommendations
    return [
        {
            crop: "Hybrid Tomato",
            suitability: 0.95,
            duration: "110-120 days",
            estimatedYield: "25-30 tons/acre",
            estimatedRevenue: "₹2,50,000 - ₹3,00,000",
            requirements: ["Loamy soil", "Regular irrigation", "Staking support"],
        },
        {
            crop: "Bell Pepper (Capsicum)",
            suitability: 0.88,
            duration: "90-100 days",
            estimatedYield: "15-20 tons/acre",
            estimatedRevenue: "₹3,00,000 - ₹4,00,000",
            requirements: ["Well-drained soil", "Moderate temperature", "Mulching"],
        },
    ];
};
