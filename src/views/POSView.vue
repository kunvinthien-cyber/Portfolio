<script setup>
import { ref } from 'vue'

// កំណត់បញ្ជីមុខម្ហូប (Menu Items) នៅចំហៀងខាងឆ្វេង
const activeSection = ref('introduction')

const menuItems = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'development', label: 'Development' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'future', label: 'Future' }
]

const scrollToSection = (id) => {
  activeSection.value = id
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-800 flex flex-col md:flex-row">
    
    <!-- ១. Sidebar Navigation (ស្អិតជាប់ខាងឆ្វេងសម្រាប់ Desktop) -->
    <aside class="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 md:h-screen md:sticky md:top-0 flex flex-col justify-between p-6 z-30">
      <div>
        <!-- Logo / Title -->
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h2 class="font-bold text-slate-900 leading-tight">POS Case Study</h2>
            <span class="text-xs text-slate-500 font-medium">Laravel 13 Full Stack</span>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="space-y-1.5">
          <button 
            v-for="item in menuItems" 
            :key="item.id"
            @click="scrollToSection(item.id)"
            :class="[
              'w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left',
              activeSection === item.id 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            ]"
          >
            {{ item.label }}
          </button>
        </nav>
      </div>

      <!-- Action Button at Sidebar Bottom -->
      <div class="mt-8 md:mt-0 pt-4 border-t border-slate-100">
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg shadow-sm shadow-blue-100 transition duration-200 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact Builder
        </button>
      </div>
    </aside>

    <!-- ២. Main Content Area (ផ្នែកមាតិកាខាងស្តាំ) -->
    <main class="flex-1 overflow-x-hidden">
      
      <!-- ផ្នែក Introduction (Hero Section) -->
      <section id="introduction" class="px-6 py-12 md:p-16 max-w-6xl mx-auto border-b border-slate-100">
        <!-- Badges Grid -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Completed 2026
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            Lead Developer
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
            3 Months
          </span>
        </div>

        <!-- Hero Headline -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7">
            <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none mb-6">
              Next-Gen <span class="text-blue-600">POS & Inventory</span> Ecosystem
            </h1>
            <p class="text-slate-600 text-lg leading-relaxed mb-8 max-w-xl">
              A comprehensive, high-performance point-of-sale and inventory management system built with Laravel 13. Designed for speed, reliability, and real-time analytics.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4">
              <a href="#" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-blue-100 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View GitHub
              </a>
              <button class="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-3 px-6 rounded-xl shadow-sm transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Gallery
              </button>
            </div>
          </div>

          <!-- Hero Image Mockup with stats -->
          <div class="lg:col-span-5 relative">
            <div class="bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl p-4 shadow-xl shadow-blue-100">
              <div class="bg-white rounded-2xl overflow-hidden shadow-inner border border-white/20">
                <!-- Mac-style top bar -->
                <div class="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                </div>
                <!-- Mockup Content -->
                <div class="p-4 bg-slate-50 space-y-3">
                  <div class="h-6 w-1/3 bg-slate-200 rounded-md"></div>
                  <div class="grid grid-cols-3 gap-2">
                    <div class="h-20 bg-blue-50 border border-blue-100 rounded-xl p-3 flex flex-col justify-between">
                      <span class="text-[10px] font-bold text-blue-500">SALES</span>
                      <span class="text-sm font-bold text-blue-900">$14,240</span>
                    </div>
                    <div class="h-20 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex flex-col justify-between">
                      <span class="text-[10px] font-bold text-emerald-500">ORDERS</span>
                      <span class="text-sm font-bold text-emerald-900">182</span>
                    </div>
                    <div class="h-20 bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex flex-col justify-between">
                      <span class="text-[10px] font-bold text-indigo-500">STOCK</span>
                      <span class="text-sm font-bold text-indigo-900">99.8%</span>
                    </div>
                  </div>
                  <div class="h-32 bg-white rounded-xl border border-slate-100 p-3 space-y-2">
                    <div class="h-4 w-1/2 bg-slate-100 rounded"></div>
                    <div class="space-y-1.5">
                      <div class="h-2 bg-slate-50 rounded"></div>
                      <div class="h-2 bg-slate-50 rounded"></div>
                      <div class="h-2 bg-slate-50 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Floating stat pill -->
            <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Avg. Processing Time</span>
                <span class="text-sm font-bold text-slate-800">&lt; 50ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ផ្នែក Core Capabilities Grid -->
      <section class="px-6 py-16 max-w-6xl mx-auto border-b border-slate-100">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-extrabold text-slate-900 mb-4">Core Capabilities</h2>
          <p class="text-slate-500 leading-relaxed">
            Engineered to handle complex inventory workflows while providing a frictionless checkout experience.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Card 1: Inventory -->
          <div class="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">Smart Inventory Management</h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6">
                Real-time stock tracking, automated reorder alerts, and multi-warehouse support. Built with pessimistic locking to prevent overselling during high-traffic events.
              </p>
            </div>
            <div class="flex items-center gap-6 pt-4 border-t border-slate-50">
              <div>
                <span class="text-xs text-slate-400 block mb-0.5">Accuracy Rate</span>
                <span class="text-lg font-bold text-blue-600">99.9%</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block mb-0.5">Stock Sync</span>
                <span class="text-lg font-bold text-slate-800">Live</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Lightning POS -->
          <div class="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">Lightning POS</h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6">
                Keyboard-first interface designed for rapid checkout. Supports barcode scanners, receipt printers, and offline mode capabilities via Service Workers.
              </p>
            </div>
            <div class="pt-4 border-t border-slate-50">
              <span class="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Offline Capable
              </span>
            </div>
          </div>

          <!-- Card 3: Actionable Analytics -->
          <div class="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition duration-200">
            <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Actionable Analytics</h3>
            <p class="text-sm text-slate-500 leading-relaxed">
              Custom reporting engine generating insights on sales velocity, profit margins, and peak trading hours. Real-time updates push new transaction values in under 2 seconds.
            </p>
          </div>

          <!-- Card 4: RBAC -->
          <div class="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition duration-200">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Role-Based Access Control</h3>
            <p class="text-sm text-slate-500 leading-relaxed">
              Granular permissions ensuring cashiers, managers, and admins only see what they need to. Fully secured on the server-side with Laravel Policies and Gates.
            </p>
          </div>

        </div>
      </section>

      <!-- ផ្នែក Relational Architecture -->
      <section id="architecture" class="px-6 py-16 max-w-6xl mx-auto border-b border-slate-100">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-6 space-y-6">
            <h2 class="text-3xl font-extrabold text-slate-900">Relational Architecture</h2>
            <p class="text-slate-500 leading-relaxed">
              The database schema is heavily optimized for read-heavy operations while maintaining strict ACID compliance for transactions.
            </p>

            <!-- Features with Checkmarks -->
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <h4 class="font-bold text-slate-800 text-sm">Normalized Design</h4>
                  <p class="text-xs text-slate-500 mt-0.5">Reduced data redundancy ensuring data integrity across categories, products, and orders.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <h4 class="font-bold text-slate-800 text-sm">Foreign Key Constraints</h4>
                  <p class="text-xs text-slate-500 mt-0.5">Strict cascading rules to prevent orphaned records.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <h4 class="font-bold text-slate-800 text-sm">Indexed Views</h4>
                  <p class="text-xs text-slate-500 mt-0.5">Complex reporting queries are backed by materialized views for high performance.</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Interactive Clean ERD Representation -->
          <div class="lg:col-span-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"></div>
              
              <div class="relative space-y-6">
                <!-- Top Row tables -->
                <div class="grid grid-cols-2 gap-4">
                  <!-- Category Table -->
                  <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs shadow-sm">
                    <div class="font-bold text-blue-700 pb-1.5 border-b border-slate-200 mb-1.5 flex justify-between items-center">
                      <span>Categories</span>
                      <span class="text-[9px] bg-blue-50 text-blue-600 px-1 rounded font-bold">1:N</span>
                    </div>
                    <ul class="space-y-1 text-slate-600">
                      <li><strong class="text-slate-800">category_id</strong> <span class="text-[10px] text-slate-400">PK</span></li>
                      <li>name <span class="text-[10px] text-slate-400">VARCHAR</span></li>
                    </ul>
                  </div>

                  <!-- Store Table -->
                  <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs shadow-sm">
                    <div class="font-bold text-blue-700 pb-1.5 border-b border-slate-200 mb-1.5 flex justify-between items-center">
                      <span>Stores</span>
                      <span class="text-[9px] bg-blue-50 text-blue-600 px-1 rounded font-bold">1:N</span>
                    </div>
                    <ul class="space-y-1 text-slate-600">
                      <li><strong class="text-slate-800">store_id</strong> <span class="text-[10px] text-slate-400">PK</span></li>
                      <li>name <span class="text-[10px] text-slate-400">VARCHAR</span></li>
                      <li>subdomain <span class="text-[10px] text-slate-400">VARCHAR</span></li>
                    </ul>
                  </div>
                </div>

                <!-- Products table in center -->
                <div class="flex justify-center">
                  <div class="w-2/3 bg-white border-2 border-blue-500 rounded-xl p-3 text-xs shadow-md">
                    <div class="font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-1.5 flex justify-between items-center">
                      <span>Products</span>
                      <span class="text-[9px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold">Core</span>
                    </div>
                    <ul class="space-y-1 text-slate-600">
                      <li><strong class="text-slate-800">product_id</strong> <span class="text-[10px] text-slate-400">PK</span></li>
                      <li>category_id <span class="text-[10px] text-slate-400">FK</span></li>
                      <li>store_id <span class="text-[10px] text-slate-400">FK</span></li>
                      <li>name <span class="text-[10px] text-slate-400">VARCHAR</span></li>
                      <li>price <span class="text-[10px] text-slate-400">DECIMAL</span></li>
                    </ul>
                  </div>
                </div>

                <!-- Bottom Row tables -->
                <div class="grid grid-cols-2 gap-4">
                  <!-- Order Item Table -->
                  <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs shadow-sm">
                    <div class="font-bold text-blue-700 pb-1.5 border-b border-slate-200 mb-1.5">Order Items</div>
                    <ul class="space-y-1 text-slate-600">
                      <li><strong class="text-slate-800">item_id</strong> <span class="text-[10px] text-slate-400">PK</span></li>
                      <li>product_id <span class="text-[10px] text-slate-400">FK</span></li>
                      <li>price <span class="text-[10px] text-slate-400">DECIMAL</span></li>
                    </ul>
                  </div>

                  <!-- Customers Table -->
                  <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs shadow-sm">
                    <div class="font-bold text-blue-700 pb-1.5 border-b border-slate-200 mb-1.5">Customers</div>
                    <ul class="space-y-1 text-slate-600">
                      <li><strong class="text-slate-800">customer_id</strong> <span class="text-[10px] text-slate-400">PK</span></li>
                      <li>email <span class="text-[10px] text-slate-400">VARCHAR</span></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ផ្នែក Development Journey Timeline -->
      <section id="development" class="px-6 py-16 max-w-6xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-extrabold text-slate-900 mb-4">Development Journey</h2>
          <p class="text-slate-500 leading-relaxed">
            From initial scoping to final deployment, a structured approach to building robust software.
          </p>
        </div>

        <div class="relative pl-6 md:pl-0 border-l-2 border-slate-100 md:border-l-0 max-w-4xl mx-auto space-y-16">
          
          <!-- Timeline Vertical Line for Desktop -->
          <div class="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-slate-100 transform -translate-x-1/2"></div>

          <!-- Step 1 -->
          <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Left Side: Detail -->
            <div class="md:text-right md:pr-12">
              <span class="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2 block">Step 01</span>
              <h3 class="text-lg font-bold text-slate-900 mb-2">Requirements & Setup</h3>
              <p class="text-sm text-slate-500 leading-relaxed">
                Defining core entities and establishing the Laravel 13 environment with Sail, configuring local environments, and defining API standards.
              </p>
            </div>
            
            <!-- Timeline Center Dot (Desktop) -->
            <div class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-blue-500 transform -translate-x-1.5 md:-translate-x-2 z-10"></div>

            <!-- Right Side: Code snippet mockup -->
            <div class="md:pl-12">
              <div class="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 shadow-sm overflow-x-auto border border-slate-800">
                <span class="text-slate-500">$ composer create-project laravel/laravel pos-system</span>
                <span class="block text-slate-500 mt-1">$ php artisan sail:install</span>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Left Side: Code Visual -->
            <div class="order-2 md:order-1 md:pr-12">
              <div class="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-slate-300 shadow-sm border border-slate-800">
                <div class="flex items-center gap-1.5 mb-2 border-b border-slate-800 pb-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span class="text-[9px] text-slate-500 ml-2">CheckoutController.php</span>
                </div>
                <span class="text-blue-400">public function</span> <span class="text-yellow-400">processCheckout</span>() {<br>
                &nbsp;&nbsp;DB::<span class="text-emerald-400">transaction</span>(<span class="text-blue-400">function</span>() {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-slate-500">// Business Logic</span><br>
                &nbsp;&nbsp;});<br>
                }
              </div>
            </div>

            <!-- Timeline Center Dot (Desktop) -->
            <div class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-blue-500 transform -translate-x-1.5 md:-translate-x-2 z-10"></div>

            <!-- Right Side: Detail -->
            <div class="order-1 md:order-2 md:pl-12">
              <span class="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2 block">Step 02</span>
              <h3 class="text-lg font-bold text-slate-900 mb-2">Core Logic Implementation</h3>
              <p class="text-sm text-slate-500 leading-relaxed">
                Building the transactional checkout process ensuring data consistency using database transactions, pessimistic locks on inventory, and automated invoice mailings.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Left Side: Detail -->
            <div class="md:text-right md:pr-12">
              <span class="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2 block">Step 03</span>
              <h3 class="text-lg font-bold text-slate-900 mb-2">Successful Deployment</h3>
              <p class="text-sm text-slate-500 leading-relaxed">
                Deployed to production environment via Laravel Forge with zero-downtime deployment scripts, managed migrations, and linked Redis queue listeners.
              </p>
            </div>

            <!-- Timeline Center Dot (Desktop) -->
            <div class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 transform -translate-x-1.5 md:-translate-x-2 z-10"></div>

            <!-- Right Side: Celebrate Image or visual badge -->
            <div class="md:pl-12">
              <div class="bg-gradient-to-tr from-emerald-50 to-emerald-100 border border-emerald-200/80 rounded-2xl p-6 text-center space-y-3">
                <div class="w-12 h-12 bg-emerald-500 text-white rounded-xl mx-auto flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-slate-900 text-sm">Project Successfully Deployed</h4>
                  <p class="text-xs text-slate-500 mt-1">Laravel Forge • production servers active</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Full Stack Portfolio Footer -->
      <footer class="bg-white border-t border-slate-200 mt-20">
        <div class="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            <h4 class="font-bold text-slate-900 mb-1">Full Stack Portfolio</h4>
            <p>© 2026 Full Stack Portfolio • Built with Laravel & Tailwind</p>
          </div>
          <div class="flex flex-wrap gap-x-6 gap-y-2 font-medium">
            <a href="#" class="hover:text-slate-900 transition">Privacy Policy</a>
            <a href="#" class="hover:text-slate-900 transition">Terms of Service</a>
            <a href="#" class="hover:text-slate-900 transition">Github</a>
            <a href="#" class="hover:text-slate-900 transition">LinkedIn</a>
          </div>
        </div>
      </footer>

    </main>
  </div>
</template>

<style scoped>
/* សម្រាប់ Noto Sans Khmer font fallback ករណីកុំព្យូទ័រមិនទាន់មាន */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Khmer:wght@400;500;600;700&display=swap');
</style>