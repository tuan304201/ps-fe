<template>
  <div v-show="isOpen || isClosing" class="sheet-overlay" @click.self="closeSheet">
    <div :class="['sheet-content', { open: isOpen, closing: isClosing }]">
      <div class="sheet-header">
        <button class="border-[1px] border-neutral-400 rounded-full absolute top-4 right-4 p-1" @click="closeSheet">
          <Icon icon="material-symbols-light:close-rounded" class="size-5 text-neutral-400" />
        </button>
      </div>
      <div class="sheet-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isClosing: false,
    };
  },
  methods: {
    openSheet() {
      this.isOpen = true;
      this.isClosing = false;
      document.body.style.overflow = "hidden";
    },
    closeSheet() {
      this.isClosing = true;
      setTimeout(() => {
        this.isOpen = false;
        this.isClosing = false;
      }, 350);
      document.body.style.overflow = "";
    },
  },
};
</script>

<style scoped>
.no-scroll {
  overflow: hidden !important;
}

.sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  z-index: 100000;
}

.sheet-content {
  background-color: white;
  width: 90%;
  max-width: 383px;
  height: 100%;
  overflow: hidden;
  animation: slideInFromLeft 0.4s ease-out;
  transform: translateX(-100%);
  position: relative;
  transition: transform 0.4s ease-out;
}

.sheet-content.open {
  transform: translateX(0);
}

.sheet-content.closing {
  animation: slideOutToLeft 0.35s ease-out forwards;
}

.sheet-header {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.sheet-body {
  padding: 0 20px 0 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideOutToLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
