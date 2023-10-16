import type { Ref } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default function useSearch(): { searchTerm: Ref<string>; handleSearch: () => Promise<void> } {
  const router = useRouter()
  const searchTerm = ref('')

  async function handleSearch() {
    if (searchTerm.value) {
      try {
        await router.push({ name: 'search-results', query: { keyword: searchTerm.value } })
      }
      catch (error) {
        console.error('Error navigating to search results:', error)
      }
    }
  }

  return {
    searchTerm,
    handleSearch,
  }
}
