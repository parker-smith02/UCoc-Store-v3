import { supabase } from "../../supabase";
export async function authGuard(to, from, next) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (to.name === "admin login" && !!user) {
    return next({ name: "admin" });
  }

  if (!to.meta.authRequired || !!user) {
    return next();
  } else {
    return next({ name: "admin login" });
  }
}
