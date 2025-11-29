'use client';

import {
  Firestore,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import {
  setDocumentNonBlocking,
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';

// Data types matching firestore structure
export interface UmkmProfile {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  contactWhatsapp?: string;
  contactInstagram?: string;
  contactShopee?: string;
  location?: string;
  minisiteTemplateId?: string;
}

export interface Product {
  id: string;
  umkmProfileId: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  category: string;
  stockStatus: string;
}

// Function to create a UMKM profile for a new user
export const createUmkmProfileForUser = async (
  firestore: Firestore,
  user: User,
  umkmName: string
) => {
  const umkmProfileRef = doc(collection(firestore, 'umkm_profiles'));
  const userRef = doc(firestore, 'users', user.uid);

  const newUmkmProfile: Omit<UmkmProfile, 'id'> = {
    ownerId: user.uid,
    name: umkmName,
    description: `Selamat datang di ${umkmName}! Kami menyediakan produk-produk berkualitas.`,
  };

  // Create a document with the custom ID
  await setDocumentNonBlocking(doc(firestore, 'umkm_profiles', umkmProfileRef.id), newUmkmProfile);
  
  // Update the user document with the new UMKM profile ID
  await setDocumentNonBlocking(userRef, { umkmProfileId: umkmProfileRef.id, email: user.email }, { merge: true });
};


// Function to add a new product to a UMKM profile
export const addProduct = async (
  firestore: Firestore,
  umkmProfileId: string,
  productData: Omit<Product, 'id' | 'umkmProfileId'>
) => {
  const productsCollectionRef = collection(
    firestore,
    'umkm_profiles',
    umkmProfileId,
    'products'
  );
  
  const newProduct = {
    ...productData,
    umkmProfileId: umkmProfileId,
    createdAt: serverTimestamp(),
  }

  // Uses non-blocking add. It will resolve to a DocumentReference, but we don't need to wait.
  return addDocumentNonBlocking(productsCollectionRef, newProduct);
};

// Function to update a UMKM profile
export const updateUmkmProfile = async (
  firestore: Firestore,
  umkmProfileId: string,
  data: Partial<UmkmProfile>
) => {
  const umkmProfileRef = doc(firestore, 'umkm_profiles', umkmProfileId);
  
  const updateData = {
    ...data,
    updatedAt: serverTimestamp(),
  };

  // Use non-blocking update
  return updateDocumentNonBlocking(umkmProfileRef, updateData);
};
