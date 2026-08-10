import { customers } from "@/lib/customer-data";

export function CustomerList() {
  return (
    <aside className="col-span-4 rounded-2xl border border-border overflow-hidden">
      <div className="border-b border-border p-4">
        <h3 className="font-semibold">Portfolio</h3>
      </div>

      <div>
        {customers.map((customer) => (
          <button
            key={customer.id}
            className="flex w-full items-center justify-between border-b border-border p-4 text-left hover:bg-muted"
          >
            <div>
              <p className="font-medium">{customer.name}</p>
              <p className="text-sm text-muted-foreground">
                {customer.segment}
              </p>
            </div>

            <span className="rounded-full border px-2 py-1 text-xs">
              {customer.health}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}