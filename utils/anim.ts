import { useAnimate } from "@vueuse/core";

export function animateImageChange(
  e: any,
  previewURL: Ref<string>,
  previewImage: Ref<HTMLElement | null>
) {
  const file = e.target.files[0];
  const value = URL.createObjectURL(file);

  if (previewURL.value === value) return;

  // Animation
  if (previewImage.value) {
    useAnimate(
      previewImage.value,
      [{ opacity: 1 }, { opacity: 0 }, { opacity: 0 }, { opacity: 1 }],
      1000
    );
    setTimeout(() => (previewURL.value = value), 510);
  } else {
    previewURL.value = value;
  }
}
