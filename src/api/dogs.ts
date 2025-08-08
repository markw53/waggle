import { db } from "@/firebase";
import { collection, getDocs, query, limit, doc, getDoc, where } from "firebase/firestore";
import type { DogProfile } from "@/types/dog";

export const dogsApi = {
  /**
   * Fetches up to 3 featured dog profiles.
   * You can add your own 'featured' field to filter if needed.
   */
  async getFeaturedDogs(): Promise<{ data: { dogs: DogProfile[] } }> {
    // Example: get first 3 dogs for home page
    const q = query(collection(db, "dogs"), limit(3));
    const docSnaps = await getDocs(q);

    const dogs: DogProfile[] = docSnaps.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<DogProfile, "id">),
    }));

    return { data: { dogs } };
  },

  /**
   * Fetches a single dog profile by Firestore document ID.
   */
  async getDogById(id: string): Promise<{ data: { dog: DogProfile | undefined } }> {
    const ref = doc(db, "dogs", id);
    const snap = await getDoc(ref);

    return {
      data: {
        dog: snap.exists()
          ? { id: snap.id, ...(snap.data() as Omit<DogProfile, "id">) }
          : undefined,
      },
    };
  },

  /**
   * (Optional) Fetch all dogs belonging to a given user.
   */
  async getDogsByOwner(ownerId: string): Promise<{ data: { dogs: DogProfile[] } }> {
    const q = query(collection(db, "dogs"), where("ownerId", "==", ownerId));
    const docSnaps = await getDocs(q);

    const dogs: DogProfile[] = docSnaps.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<DogProfile, "id">),
    }));

    return { data: { dogs } };
  },

  /**
   * (Optional) Create a new dog profile
   * @param dog
   */
  async addDog(dog: Omit<DogProfile, "id">): Promise<{ data: { id: string } }> {
    const dogsRef = collection(db, "dogs");
    const docRef = await dogsRef.add(dog);
    return { data: { id: docRef.id } };
  }
};

export default dogsApi;