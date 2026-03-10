import { useState, useMemo } from "react";
import Select from "react-select";
import type { AlertType, NotificationMethod } from "../../store/useStore";
import { useStore } from "../../store/useStore";
import { CoinSelector } from "../selectors/CoinSelector";
import { ExchangeSelector } from "../selectors/ExchangeSelector";
import { useMarketData } from "../../hooks/useMarketData";
import { useAlertOptions } from "../../hooks/useAlertOptions";
import {
  createPriceAlert,
  createPercentageAlert,
  createPeriodicAlert,
  createTwitterDigestAlert,
  createCustomAlert,
  createCryptoBriefingAlert,
} from "../../api/alertApi";

export interface AlertFormConfig {
  type: AlertType;
  showCoin?: boolean;
  showExchange?: boolean;
  showDirection?: boolean;
  directionOptions?: string[];
  showThreshold?: boolean;
  thresholdLabel?: string;
  thresholdPlaceholder?: string;
  showCurrency?: boolean;
  showCooldown?: boolean;
  showNote?: boolean;
  showOneTime?: boolean;
  showFrequency?: boolean;
  showTimeWindow?: boolean;
  showAccountUsernames?: boolean;
  showTimezone?: boolean;
  showMaxTweets?: boolean;
  showQuery?: boolean;
  showTopics?: boolean;
  showTone?: boolean;
  showFocusTags?: boolean;
}

const currencyLabels: Record<string, string> = {
  USD: "Dollars (USD)",
  BTC: "Bitcoin (BTC)",
  ETH: "Ether (ETH)",
  EUR: "Euros (EUR)",
  GBP: "Pounds (GBP)",
};

const currencyOptions = ["USD", "BTC", "ETH", "EUR", "GBP"];
const timeWindowOptions = ["24h", "7d"];

const notificationOptions: { id: NotificationMethod; label: string }[] = [
  { id: "email", label: "Email" },
  { id: "push", label: "Push Notification" },
];

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "technical", label: "Technical" },
  { value: "brief", label: "Brief" },
];

const topicOptions = [
  { value: "prices", label: "Prices" },
  { value: "news", label: "News" },
  { value: "dao", label: "DAOs" },
  { value: "social", label: "Social Sentiment" },
  { value: "events", label: "Events" },
];

const inlineTopicsSelectStyles: React.ComponentProps<typeof Select>["styles"] =
  {
    control: (base) => ({
      ...base,
      background: "transparent",
      border: "none",
      borderBottom: "2px solid var(--color-primary)",
      borderRadius: 0,
      boxShadow: "none",
      minHeight: "unset",
      cursor: "pointer",
      flexWrap: "nowrap",
      lineHeight: "1.5",
    }),
    valueContainer: (base) => ({ ...base, padding: "0 4px", gap: 4 }),
    multiValue: (base) => ({
      ...base,
      background: "color-mix(in srgb, var(--color-primary) 15%, transparent)",
      borderRadius: 4,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "var(--color-primary)",
      fontWeight: 600,
      fontSize: "1rem",
      padding: "0 4px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "var(--color-primary)",
      ":hover": {
        background: "transparent",
        color: "var(--color-primary-hover)",
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "var(--color-primary)",
      padding: "0 4px",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (base) => ({
      ...base,
      background: "var(--color-surface-light)",
      border: "1px solid var(--color-surface-border)",
      borderRadius: 8,
      minWidth: 160,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused
        ? "color-mix(in srgb, var(--color-primary) 15%, transparent)"
        : "transparent",
      color: state.isSelected ? "var(--color-primary)" : "var(--color-text)",
      cursor: "pointer",
      fontWeight: state.isSelected ? 600 : 400,
      lineHeight: "1",
    }),
  };

const inlineSelectClass =
  "bg-transparent border-0 border-b-2 border-primary text-primary font-semibold cursor-pointer text-lg px-1 py-0 focus:outline-none hover:border-primary/70 transition-colors";

const inlineInputClass =
  "bg-transparent border-0 border-b-2 border-primary text-primary font-semibold text-lg px-1 py-0 focus:outline-none hover:border-primary/70 transition-colors w-28 text-center";

interface AlertFormProps {
  config: AlertFormConfig;
}

export function AlertForm({ config }: AlertFormProps) {
  const addAlert = useStore((s) => s.addAlert);
  const addToast = useStore((s) => s.addToast);
  const authToken = useStore((s) => s.authToken);
  const { coins } = useMarketData();
  const timezoneOptions = useMemo(() => {
    const now = new Date();
    return Intl.supportedValuesOf("timeZone")
      .map((tz) => {
        const offsetStr =
          new Intl.DateTimeFormat("en", {
            timeZone: tz,
            timeZoneName: "shortOffset",
          })
            .formatToParts(now)
            .find((p) => p.type === "timeZoneName")?.value ?? "GMT";
        const match = offsetStr.match(/GMT([+-]\d+(?::\d+)?)?/);
        const offsetMinutes = match?.[1]
          ? (() => {
              const [h, m] = match[1].split(":").map(Number);
              return h * 60 + (m || 0);
            })()
          : 0;
        return {
          value: tz,
          label: `${offsetStr} ${tz.replace(/_/g, " ")}`,
          offsetMinutes,
        };
      })
      .sort((a, b) => a.offsetMinutes - b.offsetMinutes);
  }, []);
  const { cooldowns, frequencies, presets } = useAlertOptions(authToken?.value);

  const [coin, setCoin] = useState(config.showQuery ? "" : "BTC");
  const [exchange, setExchange] = useState("");
  const [condition, setCondition] = useState(
    config.directionOptions?.[0] ?? "above",
  );
  const [threshold, setThreshold] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [notificationMethod, setNotificationMethod] =
    useState<NotificationMethod>("email");
  const [cooldown, setCooldown] = useState("");
  const [note, setNote] = useState("");
  const [oneTime, setOneTime] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [timeWindow, setTimeWindow] = useState("24h");
  const [accountUsernames, setAccountUsernames] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [maxTweets, setMaxTweets] = useState("10");
  const [query, setQuery] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  const preset = selectedPreset || presets[0]?.value || "";
  const [triggerAt, setTriggerAt] = useState("");
  const [tone, setTone] = useState("professional");
  const [focusTags, setFocusTags] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([
    { value: "prices", label: "Prices" },
    { value: "news", label: "News" },
    { value: "social", label: "Social Sentiment" },
    { value: "events", label: "Events" },
  ]);

  const includePrices = selectedTopics.some((t) => t.value === "prices");
  const includeNews = selectedTopics.some((t) => t.value === "news");
  const includeDao = selectedTopics.some((t) => t.value === "dao");
  const includeSocialSentiment = selectedTopics.some(
    (t) => t.value === "social",
  );
  const includeEvents = selectedTopics.some((t) => t.value === "events");

  const directions = config.directionOptions ?? ["above", "below"];
  const selectedCoin = coins.find((c) => c.symbol === coin);
  const isWebSearchStyle = !!config.showQuery && config.type === "custom";
  const isPeriodicStyle =
    !isWebSearchStyle && !!config.showFrequency && !config.showDirection;
  const isPercentStyle = !isWebSearchStyle && !!config.showTimeWindow;

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const coinSlug =
      coins.find((c) => c.symbol === coin)?.id ?? coin.toLowerCase();

    // POST to backend API for supported alert types
    if (
      [
        "price",
        "percent",
        "periodic",
        "twitter-digest",
        "custom",
        "crypto-briefing",
      ].includes(config.type) &&
      authToken?.value
    ) {
      setSubmitting(true);
      try {
        if (config.type === "custom") {
          await createCustomAlert(authToken.value, {
            coinSlug:
              config.showCoin && coin
                ? (coins.find((c) => c.symbol === coin)?.id ??
                  coin.toLowerCase())
                : undefined,
            query,
            frequency,
            timezone,
            notificationMethod,
          });
        } else if (config.type === "price") {
          await createPriceAlert(authToken.value, {
            coinSlug,
            direction: condition,
            threshold: Number(threshold),
            cooldown: cooldown || undefined,
            notificationMethod,
          });
        } else if (config.type === "percent") {
          await createPercentageAlert(authToken.value, {
            coinSlug,
            direction: condition,
            timeWindow,
            threshold: Number(threshold),
            cooldown: cooldown || undefined,
            notificationMethod,
          });
        } else if (config.type === "periodic") {
          await createPeriodicAlert(authToken.value, {
            coinSlug,
            direction: condition,
            threshold: Number(threshold),
            frequency,
            cooldown: cooldown || undefined,
            notificationMethod,
          });
        } else if (config.type === "crypto-briefing") {
          const parsedFocusTags = focusTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
          await createCryptoBriefingAlert(authToken.value, {
            preset: triggerAt ? undefined : preset,
            triggerAt: triggerAt
              ? `${new Date().toISOString().split("T")[0]}T${triggerAt}:00Z`
              : undefined,
            timezone,
            tone,
            focusTags: parsedFocusTags,
            notificationMethod,
            includePrices,
            includeNews,
            includeDao,
            includeSocialSentiment,
            includeEvents,
          });
        } else if (config.type === "twitter-digest") {
          await createTwitterDigestAlert(authToken.value, {
            coinSlug:
              config.showCoin && coin
                ? (coins.find((c) => c.symbol === coin)?.id ??
                  coin.toLowerCase())
                : undefined,
            frequency,
            timezone,
            query: query || undefined,
            maxTweets: Number(maxTweets) || 10,
            notificationMethod,
            accountUsernames: accountUsernames
              .split(",")
              .map((u) => u.trim().replace(/^@/, ""))
              .filter(Boolean),
          });
        }
      } catch (err) {
        addToast(
          err instanceof Error ? err.message : "Failed to create alert",
          "error",
        );
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
    }

    addAlert({
      type: config.type,
      coin: config.showCoin ? coin : undefined,
      exchange: config.showExchange && exchange ? exchange : undefined,
      condition: config.showDirection
        ? (condition as "above" | "below" | "rises" | "drops" | "change")
        : undefined,
      threshold:
        config.showThreshold && threshold ? Number(threshold) : undefined,
      currency: config.showCurrency ? currency : undefined,
      notificationMethods: [notificationMethod],
      cooldown: config.showCooldown && cooldown ? cooldown : undefined,
      note: config.showNote && note ? note : undefined,
      oneTime: config.showOneTime ? oneTime : undefined,
      frequency: config.showFrequency ? frequency : undefined,
      tone: config.showTone ? tone : undefined,
      focusTags: config.showFocusTags && focusTags
        ? focusTags.split(",").map((t) => t.trim()).filter(Boolean)
        : undefined,
      timeWindow: config.showTimeWindow ? timeWindow : undefined,
      query: config.showQuery && query ? query : undefined,
      includePrices: config.showTopics ? includePrices : undefined,
      includeNews: config.showTopics ? includeNews : undefined,
      includeDao: config.showTopics ? includeDao : undefined,
      includeSocialSentiment: config.showTopics
        ? includeSocialSentiment
        : undefined,
      includeEvents: config.showTopics ? includeEvents : undefined,
      isActive: true,
    });

    addToast("Alert created successfully!");
    setThreshold("");
    setNote("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-surface-border rounded-xl p-8"
    >
      <div className="text-lg leading-[3] text-text flex flex-wrap items-baseline gap-x-1.5">
        {/* --- Web Search style: "Search the web for [query] related to [coin] and send me a [Daily] [Email]." --- */}
        {isWebSearchStyle && (
          <>
            <span>Alert me on</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Bitcoin ETF"
              className={inlineInputClass + " w-40"}
              required
            />
            {config.showCoin && (
              <>
                <span>related to</span>
                <CoinSelector
                  value={coin}
                  onChange={setCoin}
                  coins={coins}
                  variant="inline"
                  allowNone
                />
              </>
            )}
            <span>and send me a</span>
            <select
              title="Select Notification Method"
              value={notificationMethod}
              onChange={(e) =>
                setNotificationMethod(e.target.value as NotificationMethod)
              }
              className={inlineSelectClass}
            >
              {notificationOptions.map((m) => (
                <option className="capitalize" key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
            <select
              title="Select Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className={inlineSelectClass}
            >
              {frequencies.map((f) => (
                <option className="capitalize" key={f.name} value={f.name}>
                  {f.label}
                </option>
              ))}
            </select>
            <span>.</span>
          </>
        )}

        {/* --- Periodic style: "Send me a [Daily] [Email] update about [coin] in [currency] on [exchange]." --- */}
        {isPeriodicStyle && (
          <>
            <span>Send me a</span>
            {config.type === "crypto-briefing" && (
              <select
                title="Select Preset"
                value={triggerAt ? "" : preset}
                onChange={(e) => {
                  setSelectedPreset(e.target.value);
                  setTriggerAt("");
                }}
                disabled={!!triggerAt}
                className={inlineSelectClass}
              >
                {presets.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            )}
            <select
              title="Select Notification Method"
              value={notificationMethod}
              onChange={(e) =>
                setNotificationMethod(e.target.value as NotificationMethod)
              }
              className={inlineSelectClass}
            >
              {notificationOptions.map((m) => (
                <option className="capitalize" key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
            {config.type === "crypto-briefing" && (
              <>
                <span>at</span>
                <input
                  type="time"
                  title="Custom time (overrides preset)"
                  value={triggerAt}
                  onChange={(e) => setTriggerAt(e.target.value)}
                  className={inlineSelectClass}
                />
              </>
            )}
            {config.type !== "crypto-briefing" && (
              <select
                title="Select Frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className={inlineSelectClass}
              >
                {frequencies.map((f) => (
                  <option className="capitalize" key={f.name} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            )}
            {(config.showCoin ||
              config.showCurrency ||
              config.showExchange) && <span>update about</span>}
            {config.showCoin && (
              <CoinSelector
                value={coin}
                onChange={setCoin}
                coins={coins}
                variant="inline"
                allowNone={config.type === "twitter-digest"}
              />
            )}
            {config.showAccountUsernames && (
              <>
                <span>or from these twitter accounts</span>
                <input
                  type="text"
                  value={accountUsernames}
                  onChange={(e) => setAccountUsernames(e.target.value)}
                  placeholder="@elonmusk, @vitalikbuterin"
                  className={inlineInputClass + " w-64"}
                />
              </>
            )}
            {!isWebSearchStyle && config.showQuery && (
              <>
                <span>or on this topic</span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. latest airdrop news"
                  className={inlineInputClass + " w-48"}
                />
              </>
            )}
            {config.showCurrency && (
              <>
                <span>in</span>
                <select
                  title="Select Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={inlineSelectClass}
                >
                  {currencyOptions.map((c) => (
                    <option key={c} value={c}>
                      {currencyLabels[c] ?? c}
                    </option>
                  ))}
                </select>
              </>
            )}
            {config.showExchange && (
              <>
                <span>on</span>
                <ExchangeSelector
                  value={exchange}
                  onChange={setExchange}
                  variant="inline"
                />
              </>
            )}
            {config.showTone && (
              <>
                <span>in a</span>
                <select
                  title="Select Tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className={inlineSelectClass}
                >
                  {toneOptions.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <span>tone</span>
              </>
            )}
            {config.showTopics && (
              <>
                <span>about</span>
                <Select
                  isMulti
                  options={topicOptions}
                  value={selectedTopics}
                  onChange={(opts) =>
                    setSelectedTopics(opts as typeof topicOptions)
                  }
                  styles={inlineTopicsSelectStyles}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                />
              </>
            )}
            <span>.</span>
          </>
        )}

        {/* --- Percent style: "Send me an [Email] as soon as [coin] [rises] by [threshold]% within [timeWindow] on [exchange]." --- */}
        {!isPeriodicStyle && isPercentStyle && (
          <>
            <span>Send me an</span>
            <select
              title="Select Notification Method"
              value={notificationMethod}
              onChange={(e) =>
                setNotificationMethod(e.target.value as NotificationMethod)
              }
              className={inlineSelectClass}
            >
              {notificationOptions.map((m) => (
                <option className="capitalize" key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
            <span>as soon as</span>
            {config.showCoin && (
              <CoinSelector
                value={coin}
                onChange={setCoin}
                coins={coins}
                variant="inline"
              />
            )}
            {config.showDirection && (
              <select
                title="Select Condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className={inlineSelectClass}
              >
                {directions.map((d) => (
                  <option key={d} value={d}>
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </option>
                ))}
              </select>
            )}
            {config.showThreshold && (
              <>
                <span>by</span>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder={config.thresholdPlaceholder ?? "0.00"}
                  className={inlineInputClass}
                  required
                  step="any"
                />
                <span>%</span>
              </>
            )}
            <span>within</span>
            <select
              title="Select Time Window"
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              className={inlineSelectClass}
            >
              {timeWindowOptions.map((tw) => (
                <option key={tw} value={tw}>
                  {tw}
                </option>
              ))}
            </select>
            {config.showExchange && (
              <>
                <span>on</span>
                <ExchangeSelector
                  value={exchange}
                  onChange={setExchange}
                  variant="inline"
                />
              </>
            )}
            <span>.</span>
          </>
        )}

        {/* --- Default style (price, volume, marketcap, dominance, funding, stock, periodic with condition): --- */}
        {!isWebSearchStyle && !isPeriodicStyle && !isPercentStyle && (
          <>
            <span>Send me a</span>
            <select
              title="Select Notification Method"
              value={notificationMethod}
              onChange={(e) =>
                setNotificationMethod(e.target.value as NotificationMethod)
              }
              className={inlineSelectClass}
            >
              {notificationOptions.map((m) => (
                <option className="capitalize" key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
            {config.showFrequency && (
              <select
                title="Select Frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className={inlineSelectClass}
              >
                {frequencies.map((f) => (
                  <option className="capitalize" key={f.name} value={f.name}>
                    {f.label}
                  </option>
                ))}
              </select>
            )}
            {config.showFrequency ? <span>when</span> : <span>as soon as</span>}
            {config.showCoin && (
              <CoinSelector
                value={coin}
                onChange={setCoin}
                coins={coins}
                variant="inline"
              />
            )}
            {config.showDirection && (
              <>
                <span>goes</span>
                <select
                  title="Select Condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className={inlineSelectClass}
                >
                  {directions.map((d) => (
                    <option key={d} value={d}>
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </option>
                  ))}
                </select>
              </>
            )}
            {config.showThreshold && (
              <>
                <span>the price of</span>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder={config.thresholdPlaceholder ?? "0.00"}
                  className={inlineInputClass}
                  required
                  step="any"
                />
              </>
            )}
            {config.showCurrency && (
              <select
                title="Select Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={inlineSelectClass}
              >
                {currencyOptions.map((c) => (
                  <option key={c} value={c}>
                    {currencyLabels[c] ?? c}
                  </option>
                ))}
              </select>
            )}
            {config.showExchange && (
              <>
                <span>on</span>
                <ExchangeSelector
                  value={exchange}
                  onChange={setExchange}
                  variant="inline"
                />
              </>
            )}
            <span>.</span>
          </>
        )}
      </div>

      {/* Current price info */}
      {config.showCoin && selectedCoin && (
        <p className="text-sm text-text-muted mt-2">
          The price of {coin} is currently{" "}
          <span className="font-semibold text-text">
            {selectedCoin.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>{" "}
          {currency}.
        </p>
      )}

      {/* Additional options row */}
      {(config.showCooldown ||
        config.showOneTime ||
        config.showNote ||
        config.showTimezone ||
        config.showMaxTweets ||
        config.showFocusTags) && (
        <div className="mt-6 flex flex-wrap gap-4 items-start">
          {config.showCooldown && (
            <div>
              <label className="block text-sm text-text-muted mb-1">
                Cooldown{" "}
                <span className="text-xs text-text-muted mt-1">
                  (Minimum time between repeated notifications for this alert.)
                </span>
              </label>
              <select
                title="Select Cooldown"
                value={cooldown}
                onChange={(e) => setCooldown(e.target.value)}
                className="px-3 py-1.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text cursor-pointer focus:outline-none focus:border-primary transition-colors"
              >
                {cooldowns.map((cd) => (
                  <option key={cd.name} value={cd.name} className="capitalize">
                    {cd.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-text-muted mt-1">
                Minimum time between repeated notifications for this alert.
              </p>
            </div>
          )}

          {config.showOneTime && (
            <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer py-1.5">
              <input
                type="checkbox"
                checked={oneTime}
                onChange={(e) => setOneTime(e.target.checked)}
                className="accent-primary"
              />
              One-time alert
            </label>
          )}

          {config.showNote && (
            <div className="flex-1 min-w-48">
              <label className="block text-xs text-text-muted mb-1">
                Note (optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note to this alert"
                className="w-full px-3 py-1.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          )}

          {config.showTimezone && (
            <div className="h-full">
              <label className="block text-xs text-text-muted mb-1">
                Timezone
              </label>
              <select
                title="Select Timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="px-3 py-1.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text focus:outline-none focus:border-primary transition-colors w-56"
              >
                <option value="UTC">GMT+0 UTC</option>
                {timezoneOptions.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {config.showFocusTags && (
            <div className="flex-1 min-w-48">
              <label className="block text-xs text-text-muted mb-1">
                Focus tags
              </label>
              <input
                type="text"
                value={focusTags}
                onChange={(e) => setFocusTags(e.target.value)}
                placeholder="bitcoin, defi, ethereum"
                className="w-full px-3 py-1.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs text-text-muted mt-1">
                Comma-separated tag slugs to focus the briefing on.
              </p>
            </div>
          )}

          {config.showMaxTweets && (
            <div>
              <label className="block text-xs text-text-muted mb-1">
                Max tweets
              </label>
              <input
                type="number"
                value={maxTweets}
                onChange={(e) => setMaxTweets(e.target.value)}
                min={1}
                title="Max tweets"
                placeholder="10"
                className="px-3 py-1.5 bg-surface-light border border-surface-border rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors w-24"
              />
            </div>
          )}

        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Creating..." : "Create Alert"}
      </button>
    </form>
  );
}
