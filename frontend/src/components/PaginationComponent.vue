<template>
  <div>
    <h2>Pagination Example</h2>

    <!-- Data Table -->
    <table border="1" cellspacing="0" cellpadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Previous</button>
      <button v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }"
        @click="changePage(page)">
        {{ page }}
      </button>
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Next</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [], // Data fetched from backend
      currentPage: 1, // Current page
      totalPages: 1, // Total number of pages
      limit: 10, // Items per page
    };
  },
  methods: {
    async fetchItems(page = 1) {
      try {
        const response = await axios.get("http://localhost:3000/items", {
          params: { page, limit: this.limit },
        });

        this.items = response.data.items;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.fetchItems(page);
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style>
/* Styling */
.pagination {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
}

.pagination .active {
  font-weight: bold;
  color: white;
  background-color: blue;
}
</style>
