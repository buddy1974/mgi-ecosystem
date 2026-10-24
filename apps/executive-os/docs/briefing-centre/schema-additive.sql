-- Executive Briefing Centre: additive schema change (generated with prisma migrate diff from be6b2af).
-- Review only. Apply with 'prisma db push' after a Neon restore point and Marcel's approval.
-- CreateTable
CREATE TABLE "exec_records" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "companySlug" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "recordType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "status" TEXT NOT NULL,
    "execStatus" TEXT NOT NULL DEFAULT 'NEW',
    "amount" DOUBLE PRECISION,
    "currency" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "dueAt" TIMESTAMP(3),
    "sourceSystem" TEXT NOT NULL,
    "sourceRef" TEXT,
    "parentRef" TEXT,
    "data" JSONB,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exec_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exec_meetings" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "companySlug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "heldAt" TIMESTAMP(3) NOT NULL,
    "chair" TEXT NOT NULL,
    "attendees" TEXT[],
    "agenda" TEXT[],
    "minutes" TEXT NOT NULL,
    "summary" TEXT,
    "documents" JSONB,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exec_meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exec_decisions" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "companySlug" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rationale" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exec_decisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exec_commitments" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "companySlug" TEXT NOT NULL,
    "decisionId" TEXT,
    "recordId" TEXT,
    "title" TEXT NOT NULL,
    "deliverable" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerRole" TEXT NOT NULL,
    "committedAt" TIMESTAMP(3) NOT NULL,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "blocker" TEXT,
    "delayCause" TEXT,
    "deliveredAt" TIMESTAMP(3),
    "evidence" TEXT,
    "acceptedBy" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exec_commitments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exec_activities" (
    "id" TEXT NOT NULL,
    "subjectType" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "fromStatus" TEXT,
    "toStatus" TEXT,
    "note" TEXT,
    "actor" TEXT NOT NULL,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exec_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exec_events" (
    "id" TEXT NOT NULL,
    "dedupeKey" TEXT NOT NULL,
    "companySlug" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "facts" JSONB,
    "actionRequired" TEXT,
    "subjectType" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "routing" TEXT,
    "processedAt" TIMESTAMP(3),
    "digestedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exec_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exec_notifications" (
    "id" TEXT NOT NULL,
    "dedupeKey" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "eventIds" TEXT[],
    "text" TEXT NOT NULL,
    "linkUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastError" TEXT,
    "telegramMessageId" TEXT,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "exec_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exec_records_ref_key" ON "exec_records"("ref");

-- CreateIndex
CREATE INDEX "exec_records_isDemo_companySlug_recordType_occurredAt_idx" ON "exec_records"("isDemo", "companySlug", "recordType", "occurredAt");

-- CreateIndex
CREATE INDEX "exec_records_parentRef_idx" ON "exec_records"("parentRef");

-- CreateIndex
CREATE UNIQUE INDEX "exec_meetings_ref_key" ON "exec_meetings"("ref");

-- CreateIndex
CREATE INDEX "exec_meetings_isDemo_heldAt_idx" ON "exec_meetings"("isDemo", "heldAt");

-- CreateIndex
CREATE UNIQUE INDEX "exec_decisions_ref_key" ON "exec_decisions"("ref");

-- CreateIndex
CREATE INDEX "exec_decisions_meetingId_idx" ON "exec_decisions"("meetingId");

-- CreateIndex
CREATE UNIQUE INDEX "exec_commitments_ref_key" ON "exec_commitments"("ref");

-- CreateIndex
CREATE INDEX "exec_commitments_isDemo_companySlug_status_dueAt_idx" ON "exec_commitments"("isDemo", "companySlug", "status", "dueAt");

-- CreateIndex
CREATE INDEX "exec_commitments_decisionId_idx" ON "exec_commitments"("decisionId");

-- CreateIndex
CREATE INDEX "exec_activities_subjectType_subjectId_createdAt_idx" ON "exec_activities"("subjectType", "subjectId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "exec_events_dedupeKey_key" ON "exec_events"("dedupeKey");

-- CreateIndex
CREATE INDEX "exec_events_isDemo_processedAt_idx" ON "exec_events"("isDemo", "processedAt");

-- CreateIndex
CREATE INDEX "exec_events_isDemo_routing_digestedAt_idx" ON "exec_events"("isDemo", "routing", "digestedAt");

-- CreateIndex
CREATE UNIQUE INDEX "exec_notifications_dedupeKey_key" ON "exec_notifications"("dedupeKey");

-- CreateIndex
CREATE INDEX "exec_notifications_isDemo_status_nextAttemptAt_idx" ON "exec_notifications"("isDemo", "status", "nextAttemptAt");

-- CreateIndex
CREATE INDEX "exec_notifications_recipient_kind_createdAt_idx" ON "exec_notifications"("recipient", "kind", "createdAt");

-- AddForeignKey
ALTER TABLE "exec_decisions" ADD CONSTRAINT "exec_decisions_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "exec_meetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exec_commitments" ADD CONSTRAINT "exec_commitments_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "exec_decisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

