import { useGlobalStore } from "@/stores/global"

const store = useGlobalStore()
const sessionStore = store.getSessionStore()

if (sessionStore != null) {
}
