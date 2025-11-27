import ClientLayoutWrapper from "./ClientLayout";

export default function Layout({children}) {


  return (
    <div className="flex w-full pt-16">
      <ClientLayoutWrapper>
        {children}
      </ClientLayoutWrapper>

    </div>
  );
}
