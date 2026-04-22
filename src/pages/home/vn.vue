<template>
  <div class="min-h-screen flex items-center justify-center text-white" style="background: #09090b">
      <div class="text-center space-y-4">
         <h1 class="text-5xl font-black gradient-text">Xin chào Việt Nam 🇻🇳</h1>
         <p class="text-slate-400">This is the Vietnam specific UI.</p>
         <button @click="$router.push('/about')" class="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-bold">Go to About</button>
      </div>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
