# Migration `20200227035908-n`

This migration has been generated by Alon Ram at 2/27/2020, 3:59:09 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP TABLE "public"."Test";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200226170013-20200226-new-postgress-server..20200227035908-n
--- datamodel.dml
+++ datamodel.dml
@@ -1,13 +1,13 @@
 datasource sqlite {
   provider = "sqlite"
-  url = "***"
+  url      = "file:./dev.db"
   enabled  = false
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("POSTGRESQL_URL")
   enabled  = true
 }
 generator client {
@@ -38,5 +38,6 @@
 enum Role {
   ADMIN
   USER
-}
+}
+
```

