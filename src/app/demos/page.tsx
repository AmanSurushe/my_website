"use client";

import { useState } from "react";
import { Column, Meta, Schema, Text, Heading } from "@once-ui-system/core";
import { SecurityHeaders } from '@/components/SecurityHeaders';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { baseURL, person } from "@/resources";

const demos = {
  path: "/demos",
  label: "Demos",
  title: `Interactive Demos – ${person.name}`,
  description: `Interactive project demonstrations and live previews by ${person.name}`,
};

export default function DemosPage() {
  const [activeTab, setActiveTab] = useState("security");

  const tabs = [
    { id: "security", label: "Security" },
    { id: "performance", label: "Performance" }
  ];

  return (
    <Column maxWidth="l" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={demos.path}
        title={demos.title}
        description={demos.description}
        image={`/api/og/generate?title=${encodeURIComponent(demos.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column fillWidth paddingY="24" gap="xl">
        <Column gap="m">
          <Heading variant="display-strong-s">
            Interactive Demos
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak">
            Explore security implementations and performance monitoring tools used in this portfolio.
          </Text>
        </Column>

        {/* <Tabs 
          fillWidth 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        /> */}

        <Column fillWidth>
          {activeTab === "security" && (
            <Column gap="l">
              <Column gap="m">
                <Heading variant="heading-strong-m">Security Headers & Implementation</Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  This portfolio implements comprehensive security measures including CSP, HSTS, and XSS protection.
                </Text>
              </Column>
              <SecurityHeaders />
            </Column>
          )}

          {activeTab === "performance" && (
            <Column gap="l">
              <Column gap="m">
                <Heading variant="heading-strong-m">Performance Monitoring</Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  Real-time performance metrics and optimization insights for this Next.js application.
                </Text>
              </Column>
              <PerformanceMonitor />
            </Column>
          )}
        </Column>
      </Column>
    </Column>
  );
}